#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

/**
 * Static Site Generator for Widget Gallery
 * 
 * Generates a browseable web gallery of widget examples for deployment to Cloudflare Pages
 * 
 * Usage:
 *   node generate-site.js
 *   
 * Output:
 *   Creates a 'dist' directory with the complete static site
 */
class WidgetGalleryGenerator {
    constructor() {
        this.widgets = [];
        this.categories = new Set();
        this.visualizationTypes = new Set();
        this.outputDir = 'dist';
    }

    /**
     * Main entry point to generate the site
     */
    async generateSite() {
        console.log('🚀 Starting widget gallery generation...');

        // Clean and create output directory
        await this.prepareOutputDirectory();

        // Find and collect all widgets
        await this.collectWidgets();

        // Generate pages
        await this.generateIndexPage();
        await this.generateWidgetPages();
        await this.copyAssets();

        console.log(`✅ Site generated successfully in ${this.outputDir}/`);
        console.log(`📊 Generated ${this.widgets.length} widget pages`);
        console.log(`📁 Categories: ${Array.from(this.categories).join(', ')}`);
    }

    /**
     * Prepare the output directory
     */
    async prepareOutputDirectory() {
        try {
            await fs.rm(this.outputDir, { recursive: true, force: true });
        } catch (error) {
            // Directory might not exist, which is fine
        }
        await fs.mkdir(this.outputDir, { recursive: true });
        console.log(`📁 Created output directory: ${this.outputDir}/`);
    }

    /**
     * Find all UserProfile* directories and collect widgets
     */
    async collectWidgets() {
        const directories = await this.findUserProfileDirectories();

        for (const dir of directories) {
            await this.collectWidgetsFromDirectory(dir);
        }

        console.log(`📦 Collected ${this.widgets.length} widgets`);
    }

    /**
     * Find all UserProfile* directories
     */
    async findUserProfileDirectories() {
        const items = await fs.readdir('.', { withFileTypes: true });
        return items
            .filter(item => item.isDirectory() && item.name.startsWith('UserProfile'))
            .map(item => item.name)
            .sort();
    }

    /**
     * Collect widgets from a directory
     */
    async collectWidgetsFromDirectory(dirName) {
        console.log(`📁 Scanning ${dirName}...`);

        // Process all JSON files in the directory
        const items = await fs.readdir(dirName, { withFileTypes: true });
        const jsonFiles = items
            .filter(item => item.isFile() && item.name.endsWith('.json'))
            .map(item => path.join(dirName, item.name));

        for (const jsonFile of jsonFiles) {
            await this.processWidget(jsonFile);
        }
    }

    /**
     * Process a single widget
     */
    async processWidget(jsonFilePath) {
        try {
            const jsonContent = await fs.readFile(jsonFilePath, 'utf8');
            const widget = JSON.parse(jsonContent);

            const basename = path.basename(jsonFilePath, '.json');
            const category = path.dirname(jsonFilePath).split(path.sep)[0];
            const pngPath = jsonFilePath.replace('.json', '.png');
            const txtPath = jsonFilePath.replace('.json', '.txt');

            // Only include widgets that have at least a JSON file
            const hasPng = await this.fileExists(pngPath);
            const hasTxt = await this.fileExists(txtPath);

            let description = '';
            if (hasTxt) {
                description = await fs.readFile(txtPath, 'utf8');
            } else if (widget.visualisation?.description?.html) {
                description = widget.visualisation.description.html;
            } else if (widget.visualisation?.description) {
                // Ensure description is a string
                description = typeof widget.visualisation.description === 'string' 
                    ? widget.visualisation.description 
                    : '';
            }

            const title = widget.visualisation?.title || this.generateTitle(basename);
            const visualizationType = widget.visualisation?.type || 'Unknown';

            this.categories.add(category);
            this.visualizationTypes.add(visualizationType);

            this.widgets.push({
                id: `${category}_${basename}`,
                title,
                basename,
                category,
                visualizationType,
                description,
                jsonPath: jsonFilePath,
                pngPath: hasPng ? pngPath : null,
                txtPath: hasTxt ? txtPath : null,
                widget
            });

        } catch (error) {
            console.warn(`⚠️  Could not process ${jsonFilePath}: ${error.message}`);
        }
    }

    /**
     * Generate a title from a basename
     */
    generateTitle(basename) {
        return basename
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     * Generate the index page
     */
    async generateIndexPage() {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Beonic Insights Widget Gallery</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }

        .subtitle {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .filters {
            background: white;
            padding: 1.5rem;
            margin: 2rem 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .filter-group {
            margin-bottom: 1rem;
        }

        .filter-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #555;
        }

        .filter-group input,
        .filter-group select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }

        .filter-row {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 1rem;
            align-items: end;
        }

        .stats {
            display: flex;
            gap: 2rem;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: #666;
        }

        .stat {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .stat-value {
            font-weight: 700;
            color: #667eea;
        }

        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .widget-card {
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }

        .widget-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .widget-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #999;
        }

        .widget-image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background: white;
        }

        .widget-content {
            padding: 1.25rem;
        }

        .widget-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #333;
        }

        .widget-meta {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            flex-wrap: wrap;
        }

        .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .badge-category {
            background: #e3f2fd;
            color: #1976d2;
        }

        .badge-type {
            background: #f3e5f5;
            color: #7b1fa2;
        }

        .badge-subcategory {
            background: #fff3e0;
            color: #ef6c00;
        }

        .widget-description {
            font-size: 0.9rem;
            color: #666;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 2rem;
            color: #999;
        }

        .no-results-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }

        footer {
            text-align: center;
            padding: 2rem;
            color: #999;
            margin-top: 4rem;
        }

        @media (max-width: 768px) {
            .filter-row {
                grid-template-columns: 1fr;
            }

            .gallery {
                grid-template-columns: 1fr;
            }

            h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <h1>🎨 Widget Gallery</h1>
            <p class="subtitle">Beonic Insights 3.0 Widget Examples</p>
        </div>
    </div>

    <div class="container">
        <div class="filters">
            <div class="filter-row">
                <div class="filter-group">
                    <label for="search">🔍 Search</label>
                    <input type="text" id="search" placeholder="Search by title or description...">
                </div>
                <div class="filter-group">
                    <label for="category">📁 Category</label>
                    <select id="category">
                        <option value="">All Categories</option>
                        ${Array.from(this.categories).sort().map(cat => 
                            `<option value="${cat}">${cat}</option>`
                        ).join('')}
                    </select>
                </div>
                <div class="filter-group">
                    <label for="type">📊 Visualization Type</label>
                    <select id="type">
                        <option value="">All Types</option>
                        ${Array.from(this.visualizationTypes).sort().map(type => 
                            `<option value="${type}">${type}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            <div class="stats">
                <div class="stat">
                    <span>Total widgets:</span>
                    <span class="stat-value" id="totalCount">${this.widgets.length}</span>
                </div>
                <div class="stat">
                    <span>Showing:</span>
                    <span class="stat-value" id="visibleCount">${this.widgets.length}</span>
                </div>
            </div>
        </div>

        <div class="gallery" id="gallery">
            ${this.widgets.map(w => this.generateWidgetCard(w)).join('')}
        </div>
    </div>

    <footer>
        <p>Beonic Insights Widget Gallery • Generated ${new Date().toLocaleDateString()}</p>
    </footer>

    <script>
        const widgets = ${JSON.stringify(this.widgets.map(w => ({
            id: w.id,
            title: w.title,
            category: w.category,
            visualizationType: w.visualizationType,
            description: w.description,
            basename: w.basename,
            hasPng: !!w.pngPath
        })))};

        const gallery = document.getElementById('gallery');
        const searchInput = document.getElementById('search');
        const categorySelect = document.getElementById('category');
        const typeSelect = document.getElementById('type');
        const visibleCount = document.getElementById('visibleCount');

        function filterWidgets() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categorySelect.value;
            const selectedType = typeSelect.value;

            let visibleWidgets = 0;

            widgets.forEach(widget => {
                const card = document.querySelector(\`[data-widget-id="\${widget.id}"]\`);
                if (!card) return;

                const matchesSearch = !searchTerm || 
                    widget.title.toLowerCase().includes(searchTerm) ||
                    widget.description.toLowerCase().includes(searchTerm);
                
                const matchesCategory = !selectedCategory || widget.category === selectedCategory;
                const matchesType = !selectedType || widget.visualizationType === selectedType;

                const isVisible = matchesSearch && matchesCategory && matchesType;
                
                card.style.display = isVisible ? 'block' : 'none';
                if (isVisible) visibleWidgets++;
            });

            visibleCount.textContent = visibleWidgets;

            // Show "no results" message
            const existingNoResults = gallery.querySelector('.no-results');
            if (existingNoResults) {
                existingNoResults.remove();
            }

            if (visibleWidgets === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = \`
                    <div class="no-results-icon">🔍</div>
                    <h2>No widgets found</h2>
                    <p>Try adjusting your search or filters</p>
                \`;
                gallery.appendChild(noResults);
            }
        }

        searchInput.addEventListener('input', filterWidgets);
        categorySelect.addEventListener('change', filterWidgets);
        typeSelect.addEventListener('change', filterWidgets);

        // Navigate to widget page on click
        document.querySelectorAll('.widget-card').forEach(card => {
            card.addEventListener('click', () => {
                window.location.href = card.dataset.href;
            });
        });
    </script>
</body>
</html>`;

        await fs.writeFile(path.join(this.outputDir, 'index.html'), html, 'utf8');
        console.log('✅ Generated index.html');
    }

    /**
     * Generate a widget card for the index page
     */
    generateWidgetCard(widget) {
        const imageSrc = widget.pngPath ?
            `${widget.category}/${widget.basename}.png` :
            '';

        // Handle description - it might be a string, object, or undefined
        let cleanDescription = '';
        if (typeof widget.description === 'string') {
            cleanDescription = widget.description
                .replace(/<[^>]*>/g, '')
                .substring(0, 200);
        } else if (widget.description && typeof widget.description === 'object') {
            // Handle case where description is an object (shouldn't happen but just in case)
            cleanDescription = JSON.stringify(widget.description).substring(0, 200);
        }

        return `
            <div class="widget-card" data-widget-id="${widget.id}" data-href="${widget.category}/${widget.basename}.html">
                <div class="widget-image">
                    ${widget.pngPath ?
                        `<img src="${imageSrc}" alt="${widget.title}">` :
                        '📊 No preview available'
                    }
                </div>
                <div class="widget-content">
                    <h3 class="widget-title">${widget.title}</h3>
                    <div class="widget-meta">
                        <span class="badge badge-category">${widget.category}</span>
                        <span class="badge badge-type">${widget.visualizationType}</span>
                    </div>
                    <p class="widget-description">${cleanDescription}</p>
                </div>
            </div>
        `;
    }

    /**
     * Generate individual widget pages
     */
    async generateWidgetPages() {
        for (const widget of this.widgets) {
            await this.generateWidgetPage(widget);
        }
        console.log(`✅ Generated ${this.widgets.length} widget pages`);
    }

    /**
     * Generate a single widget page
     */
    async generateWidgetPage(widget) {
        // Create category directory if needed
        const categoryDir = path.join(this.outputDir, widget.category);
        await fs.mkdir(categoryDir, { recursive: true });

        const imageSrc = widget.pngPath ?
            `${widget.basename}.png` :
            null;

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${widget.title} - Widget Gallery</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .breadcrumb {
            margin-bottom: 1rem;
            font-size: 0.9rem;
            opacity: 0.9;
        }

        .breadcrumb a {
            color: white;
            text-decoration: none;
        }

        .breadcrumb a:hover {
            text-decoration: underline;
        }

        h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .meta {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .badge {
            display: inline-block;
            padding: 0.4rem 1rem;
            border-radius: 16px;
            font-size: 0.85rem;
            font-weight: 600;
        }

        .badge-category {
            background: rgba(255,255,255,0.2);
        }

        .badge-type {
            background: rgba(255,255,255,0.2);
        }

        .content {
            margin: 2rem 0;
        }

        .section {
            background: white;
            border-radius: 8px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .section h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #667eea;
        }

        .preview-image {
            width: 100%;
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
            margin: 1rem 0;
        }

        .description {
            font-size: 1rem;
            line-height: 1.8;
            color: #555;
        }

        .code-block {
            position: relative;
            background: #1e1e1e;
            border-radius: 4px;
            padding: 1.5rem;
            overflow-x: auto;
            margin: 1rem 0;
        }

        .code-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #333;
        }

        .code-label {
            color: #888;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .copy-button {
            background: #667eea;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.85rem;
            font-weight: 600;
            transition: background 0.2s;
        }

        .copy-button:hover {
            background: #5568d3;
        }

        .copy-button.copied {
            background: #4caf50;
        }

        pre {
            margin: 0;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            color: #d4d4d4;
        }

        .actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }

        .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
        }

        .btn-secondary {
            background: white;
            color: #667eea;
            border: 2px solid #667eea;
        }

        .btn-secondary:hover {
            background: #f5f5ff;
        }

        footer {
            text-align: center;
            padding: 2rem;
            color: #999;
            margin-top: 4rem;
        }

        @media (max-width: 768px) {
            .meta {
                flex-direction: column;
            }

            .actions {
                flex-direction: column;
            }

            .btn {
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="breadcrumb">
                <a href="../index.html">← Back to Gallery</a>
            </div>
            <h1>${widget.title}</h1>
            <div class="meta">
                <span class="badge badge-category">${widget.category}</span>
                <span class="badge badge-type">${widget.visualizationType}</span>
            </div>
        </div>
    </div>

    <div class="container content">
        ${widget.pngPath ? `
        <div class="section">
            <h2>📊 Preview</h2>
            <img src="${imageSrc}" alt="${widget.title}" class="preview-image">
        </div>
        ` : ''}

        ${widget.description ? `
        <div class="section">
            <h2>📝 Description</h2>
            <div class="description">${typeof widget.description === 'string' ? widget.description : ''}</div>
        </div>
        ` : ''}

        <div class="section">
            <h2>💻 Widget Definition</h2>
            <div class="code-block">
                <div class="code-header">
                    <span class="code-label">JSON Configuration</span>
                    <button class="copy-button" onclick="copyCode()">Copy Code</button>
                </div>
                <pre id="code">${this.escapeHtml(JSON.stringify(widget.widget, null, 2))}</pre>
            </div>
        </div>

        <div class="actions">
            <a href="../index.html" class="btn btn-secondary">← Back to Gallery</a>
        </div>
    </div>

    <footer>
        <p>Beonic Insights Widget Gallery</p>
    </footer>

    <script>
        function copyCode() {
            const code = document.getElementById('code').textContent;
            const button = document.querySelector('.copy-button');
            
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = '✓ Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = 'Copy Code';
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                button.textContent = '✗ Failed';
                setTimeout(() => {
                    button.textContent = 'Copy Code';
                }, 2000);
            });
        }
    </script>
</body>
</html>`;

        await fs.writeFile(
            path.join(categoryDir, `${widget.basename}.html`),
            html,
            'utf8'
        );
    }

    /**
     * Copy PNG assets to output directory
     */
    async copyAssets() {
        for (const widget of this.widgets) {
            if (widget.pngPath) {
                const categoryDir = path.join(this.outputDir, widget.category);
                const targetPath = path.join(categoryDir, `${widget.basename}.png`);
                await fs.copyFile(widget.pngPath, targetPath);
            }
        }
        console.log('✅ Copied PNG assets');
    }

    /**
     * Utility: Check if directory exists
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
     * Utility: Check if file exists
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
     * Utility: Escape HTML
     */
    escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

// Run the generator
if (require.main === module) {
    const generator = new WidgetGalleryGenerator();
    generator.generateSite().catch(error => {
        console.error('❌ Error generating site:', error);
        process.exit(1);
    });
}

module.exports = WidgetGalleryGenerator;
