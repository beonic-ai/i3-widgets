# Widget Prompt Generator

This Node.js script processes the Beonic Insights 3.0 (i3) widget examples repository and generates a comprehensive
`prompt.md` file that can be used to train LLMs to help users create new widgets.

## Features

- **Automatic Widget Discovery**: Scans all `UserProfile*` directories and processes JSON widget definitions
- **Structured Organization**: Groups widgets by metric collection and subcategories (histograms vs main widgets)
- **Title & Description Extraction**: Uses `visualisation.title` and `visualisation.description.html` from JSON files
- **Image Analysis**: Two modes for analyzing visualization screenshots:
    - **Claude Vision API**: AI-powered analysis using Anthropic's vision model
    - **Filename-based**: Smart fallback using filename patterns
- **Intelligent Caching**: Saves analysis results to `.txt` files to avoid re-processing and reduce API costs
- **Image Links**: Generates markdown image links for all widget screenshots
- **Complete Documentation**: Creates a 74KB+ comprehensive training document

## Installation

```bash
npm install
```

## Usage

### Basic Usage (Filename-based Image Analysis)

```bash
node generate-prompt.js
```

### With Claude Vision API (Recommended)

```bash
ANTHROPIC_API_KEY=your_api_key_here node generate-prompt.js
```

### Force Fresh Analysis (Skip Cache)

```bash
# Skip cached results and force fresh analysis
node generate-prompt.js --no-cache

# Alternative flag
node generate-prompt.js --fresh

# With Claude Vision API and no cache
ANTHROPIC_API_KEY=your_key node generate-prompt.js --no-cache
```

## Output

The script generates a `prompt.md` file with the following structure:

```markdown
# Beonic Insights 3.0 (i3) Widget Examples

## UserProfileVisits

### Histograms

#### Visit Duration (minutes) Histogram Bar Chart

Creates a histogram of user visit durations...

```json
{widget JSON configuration}
```

**Visualization Preview:** AI-generated description of the chart...

![Visit Duration (minutes) Histogram Bar Chart](UserProfileVisits/visits-histogram-duration-barChart.png)

### Main Widgets

...

```

## Configuration

The script automatically detects if the `ANTHROPIC_API_KEY` environment variable is set:

- **With API Key**: Uses Claude Vision API for accurate image analysis
- **Without API Key**: Uses intelligent filename-based analysis

## Caching System

The script implements intelligent caching to optimize performance and reduce API costs:

- **Cache Files**: Analysis results are saved as `.txt` files next to the corresponding `.png` files
- **Example**: `visits-histogram-duration-barChart.png` → `visits-histogram-duration-barChart.txt`
- **Cache Usage**: Subsequent runs use cached analysis instead of re-analyzing images
- **Benefits**: Faster execution, reduced API costs, consistent results

### Cache Management

- **Automatic**: Cache files are created automatically during analysis
- **Persistent**: Cache files survive script runs and can be committed to version control
- **Invalidation**: Delete `.txt` files to force re-analysis of specific images
- **Git Ignore**: Cache files are excluded from git by default (see `.gitignore`)
- **Command Line Control**: Use `--no-cache` or `--fresh` flags to skip cached results

## Error Handling

- **API Errors**: Falls back to filename-based analysis if Claude API fails
- **Missing Files**: Gracefully handles missing JSON or PNG files
- **Invalid JSON**: Warns about unparseable widget files and continues processing
- **Cache Errors**: Handles missing or corrupted cache files gracefully

## Output Statistics

- **File Size**: ~74KB markdown document
- **Coverage**: All widget categories and subcategories
- **Images**: Automatic detection and linking of PNG screenshots
- **Widgets**: 70+ widget examples across all UserProfile metrics

## Dependencies

- `@anthropic-ai/sdk`: For Claude Vision API integration
- Node.js built-in modules: `fs`, `path`

## Generated Content

The prompt.md includes:
1. Widget titles from JSON `visualisation.title`
2. Descriptions from JSON `visualisation.description.html`
3. Complete JSON widget definitions
4. AI or pattern-based visualization descriptions
5. Image links to PNG screenshots
6. Organized structure by metric collection and type

This comprehensive document serves as training material for LLMs to understand the i3 widget definition language and help users create new widgets based on the examples.
