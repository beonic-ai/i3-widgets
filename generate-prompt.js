#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

// Parse command line arguments
const args = process.argv.slice(2);
const NO_CACHE = args.includes('--no-cache') || args.includes('--fresh');

// Initialize Anthropic client if API key is available
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
}) : null;

/**
 * Generate a comprehensive prompt.md from widget examples in the repository
 *
 * Usage:
 *   # Basic usage (uses filename-based image analysis)
 *   node generate-prompt.js
 *
 *   # With Claude Vision API (requires API key)
 *   ANTHROPIC_API_KEY=your_api_key_here node generate-prompt.js
 *
 *   # Skip cached results and force fresh analysis
 *   node generate-prompt.js --no-cache
 *   ANTHROPIC_API_KEY=your_key node generate-prompt.js --fresh
 */
class WidgetPromptGenerator {
    constructor() {
        this.output = [];
        this.processedImages = new Set();
    }

    /**
     * Main entry point to generate the prompt
     */
    async generatePrompt() {
        console.log('🚀 Starting widget prompt generation...');

        if (anthropic) {
            console.log('✨ Claude Vision API detected - using AI-powered image analysis');
        } else {
            console.log('📝 Using filename-based image analysis (set ANTHROPIC_API_KEY for AI analysis)');
        }

        if (NO_CACHE) {
            console.log('🔄 Cache disabled - forcing fresh analysis for all images');
        } else {
            console.log('💾 Cache enabled - will reuse existing analysis results');
        }

        // Add header
        this.output.push('# Beonic Insights 3.0 (i3) Widget Examples\n');
        this.output.push('This document contains example widget definitions using the Beonic Insights 3.0 widget definition language. Each widget defines a query against the Beonic data platform and visualization settings to present the retrieved tabular data.\n');

        // Find all widget directories
        const directories = await this.findWidgetDirectories();

        for (const dir of directories) {
            await this.processDirectory(dir);
        }

        // Write the output
        await this.writePromptFile();
        console.log('✅ Generated prompt.md successfully');
    }

    /**
     * Find all directories under definitions/ (at any depth) that contain widget JSON, and the templates directory
     */
    async findWidgetDirectories() {
        const definitionFiles = await this.findJsonFiles('definitions', true);
        const directories = [...new Set(definitionFiles.map(file => path.dirname(file)))].sort();

        // Add templates directory if it exists
        if (await this.directoryExists('templates')) {
            directories.push('templates');
        }

        return directories;
    }

    /**
     * Process a single directory (e.g., definitions/user-profiles/now)
     */
    async processDirectory(dirName) {
        console.log(`📁 Processing ${dirName}...`);

        const category = dirName.startsWith('definitions') ? path.relative('definitions', dirName) : dirName;
        this.output.push(`## ${category}\n`);

        // Process all JSON files in the directory
        const jsonFiles = await this.findJsonFiles(dirName, false);

        for (const jsonFile of jsonFiles) {
            await this.processWidget(jsonFile);
        }

        this.output.push('\n');
    }

    /**
     * Process a single widget JSON file
     */
    async processWidget(jsonFilePath) {
        try {
            console.log(`  📄 Processing ${path.basename(jsonFilePath)}...`);

            // Read and parse JSON
            const jsonContent = await fs.readFile(jsonFilePath, 'utf8');
            const widget = JSON.parse(jsonContent);

            // Generate title and description
            const title = this.generateWidgetTitle(jsonFilePath, widget);
            const description = this.generateWidgetDescription(jsonFilePath, widget);

            this.output.push(`#### ${title}\n`);
            this.output.push(`${description}\n`);

            // Add JSON content
            this.output.push('```json\n');
            this.output.push(JSON.stringify(widget, null, 2));
            this.output.push('\n```\n\n');

            // Add image link if PNG file exists
            const pngPath = jsonFilePath.replace('.json', '.png');
            if (await this.fileExists(pngPath)) {
                const imageDescription = await this.analyzeImage(pngPath);
                this.output.push(`\n**Visualization Preview:** ${imageDescription}\n`);
                const relativePngPath = path.relative('.', pngPath);
                this.output.push(`![${title}](${relativePngPath})\n\n`);
            }

        } catch (error) {
            console.warn(`⚠️  Warning: Could not process ${jsonFilePath}: ${error.message}`);
        }
    }

    /**
     * Generate a human-readable title from the widget file and content
     */
    generateWidgetTitle(filePath, widget) {
        const basename = path.basename(filePath, '.json');

        // Use widget title if available
        if (widget.visualisation && widget.visualisation.title) {
            return widget.visualisation.title;
        }

        // Fallback: Convert filename to title
        return basename
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/Json$/, '')
            .replace(/Histogram/g, 'Histogram');
    }

    /**
     * Generate a description from the widget content
     */
    generateWidgetDescription(filePath, widget) {
        const basename = path.basename(filePath, '.json');

        // Use widget description if available
        if (widget.visualisation && widget.visualisation.description) {
            if (typeof widget.visualisation.description === 'string') {
                return widget.visualisation.description;
            } else if (widget.visualisation.description.html) {
                // Strip HTML tags for description
                return widget.visualisation.description.html.replace(/<[^>]*>/g, '');
            }
        }

        // Fallback: Generate description based on file pattern and content
        let description = '';

        if (basename.includes('histogram')) {
            description = 'Creates a histogram visualization ';

            // Extract histogram field
            const histogramMatch = basename.match(/histogram-(\w+)/);
            if (histogramMatch) {
                description += `showing distribution of ${histogramMatch[1].replace(/([A-Z])/g, ' $1').toLowerCase()} `;
            }

            // Add visualization type
            if (basename.includes('barChart')) {
                description += 'displayed as a bar chart.';
            } else if (basename.includes('lineChart')) {
                description += 'displayed as a line chart.';
            } else if (basename.includes('table')) {
                description += 'displayed as a table.';
            } else {
                description += 'visualization.';
            }
        } else {
            // Generate description based on filename patterns
            if (basename.includes('by-')) {
                const parts = basename.split('by-');
                if (parts.length > 1) {
                    const metric = parts[0].replace(/-/g, ' ');
                    const dimension = parts[1].replace(/-/g, ' ');
                    description = `Shows ${metric} broken down by ${dimension}.`;
                }
            } else {
                description = `Widget showing ${basename.replace(/-/g, ' ')}.`;
            }
        }

        // Add visualization type if specified in widget
        if (widget.visualisation && widget.visualisation.type) {
            const type = widget.visualisation.type;
            if (!description.toLowerCase().includes(type.toLowerCase())) {
                description += ` Displayed as a ${type}.`;
            }
        }

        return description;
    }

    /**
     * Analyze a PNG image using Claude's vision capabilities
     */
    async analyzeImage(imagePath) {
        if (this.processedImages.has(imagePath)) {
            return "Image analysis already processed.";
        }

        this.processedImages.add(imagePath);

        // Generate cache file path (replace .png with .txt)
        const cacheFilePath = imagePath.replace('.png', '.txt');

        try {
            // Check if cached analysis exists (unless --no-cache flag is used)
            if (!NO_CACHE && await this.fileExists(cacheFilePath)) {
                console.log(`    📄 Using cached analysis for ${path.basename(imagePath)}...`);
                const cachedAnalysis = await fs.readFile(cacheFilePath, 'utf8');
                return cachedAnalysis.trim();
            }

            console.log(`    🖼️  Analyzing image ${path.basename(imagePath)}...`);

            let analysis = '';

            // Use Claude Vision API if available
            if (anthropic) {
                try {
                    const imageBuffer = await fs.readFile(imagePath);
                    const base64Image = imageBuffer.toString('base64');

                    const response = await anthropic.messages.create({
                        model: "claude-sonnet-4-20250514",
                        max_tokens: 1000,
                        messages: [{
                            role: "user",
                            content: [{
                                type: "image",
                                source: {type: "base64", media_type: "image/png", data: base64Image}
                            }, {
                                type: "text",
                                text: "Analyze this Beonic Insights widget visualization image. Describe the type of chart/visualization, the data it displays and the insights it provides. Be concise and focus on the data representation."
                            }]
                        }]
                    });

                    analysis = response.content[0].text;

                    // Cache the API result
                    await fs.writeFile(cacheFilePath, analysis, 'utf8');
                    console.log(`    💾 Cached analysis to ${path.basename(cacheFilePath)}`);

                    return analysis;

                } catch (apiError) {
                    console.warn(`⚠️  Claude API error for ${path.basename(imagePath)}: ${apiError.message}`);
                    // Fall back to filename-based analysis
                }
            }

            // Fallback: Smart analysis based on filename patterns
            const basename = path.basename(imagePath, '.png');

            if (basename.includes('histogram')) {
                if (basename.includes('age') || basename.includes('Age')) {
                    analysis = "Displays age distribution as a histogram with age ranges on the x-axis and user counts on the y-axis, showing the demographic breakdown of users.";
                } else if (basename.includes('duration')) {
                    analysis = "Shows visit duration distribution with time buckets on the x-axis and frequency counts on the y-axis, revealing user engagement patterns.";
                } else if (basename.includes('postcode')) {
                    analysis = "Presents postcode distribution as a histogram with postal code ranges and their corresponding user counts.";
                } else {
                    analysis = "Displays a histogram chart with data distributed across buckets, showing frequency distribution patterns.";
                }
            } else if (basename.includes('clicks-by-campaign')) {
                analysis = "Shows click performance across different campaigns with campaign names and corresponding click volumes, useful for campaign effectiveness analysis.";
            } else if (basename.includes('visits-by-venue')) {
                analysis = "Displays visit counts by venue location, showing which locations receive the most visitor traffic over the selected time period.";
            } else if (basename.includes('sessions-by-venue')) {
                analysis = "Shows WiFi session counts by venue, indicating user connectivity patterns and popular locations for digital engagement.";
            } else if (basename.includes('gender') && basename.includes('columns')) {
                analysis = "Presents gender distribution data in a columnar format, showing demographic breakdowns with missing value handling.";
            } else if (basename.includes('os-categories')) {
                analysis = "Displays operating system usage statistics showing the distribution of different OS types among users.";
            } else if (basename.includes('by-postcode')) {
                analysis = "Shows geographic distribution by postal code with counts or percentages for location-based analysis.";
            } else if (basename.includes('by-zone')) {
                analysis = "Displays data segmented by venue zones, showing activity patterns across different areas or sections.";
            } else {
                analysis = "Shows the visualization output representing the queried data in the format specified by the widget configuration.";
            }

            // Cache the fallback analysis
            await fs.writeFile(cacheFilePath, analysis, 'utf8');
            console.log(`    💾 Cached fallback analysis to ${path.basename(cacheFilePath)}`);

            return analysis;

        } catch (error) {
            console.warn(`⚠️  Warning: Could not analyze image ${imagePath}: ${error.message}`);
            return "Visualization image showing the widget output data.";
        }
    }

    /**
     * Find JSON files in a directory
     */
    async findJsonFiles(dirPath, recursive = false) {
        try {
            const items = await fs.readdir(dirPath, {withFileTypes: true});
            const jsonFiles = [];

            for (const item of items) {
                const fullPath = path.join(dirPath, item.name);

                if (item.isFile() && item.name.endsWith('.json')) {
                    jsonFiles.push(fullPath);
                } else if (recursive && item.isDirectory()) {
                    const subFiles = await this.findJsonFiles(fullPath, recursive);
                    jsonFiles.push(...subFiles);
                }
            }

            return jsonFiles.sort();
        } catch (error) {
            console.warn(`⚠️  Warning: Could not read directory ${dirPath}: ${error.message}`);
            return [];
        }
    }

    /**
     * Check if a directory exists
     */
    async directoryExists(dirPath) {
        try {
            const stat = await fs.stat(dirPath);
            return stat.isDirectory();
        } catch {
            return false;
        }
    }

    /**
     * Check if a file exists
     */
    async fileExists(filePath) {
        try {
            const stat = await fs.stat(filePath);
            return stat.isFile();
        } catch {
            return false;
        }
    }

    /**
     * Write the final prompt file
     */
    async writePromptFile() {
        const content = this.output.join('');
        await fs.writeFile('prompt.md', content, 'utf8');

        const stats = await fs.stat('prompt.md');
        console.log(`📝 Generated prompt.md (${Math.round(stats.size / 1024)}KB)`);
    }
}

// Run the generator
if (require.main === module) {
    const generator = new WidgetPromptGenerator();
    generator.generatePrompt().catch(error => {
        console.error('❌ Error generating prompt:', error);
        process.exit(1);
    });
}

module.exports = WidgetPromptGenerator;
