# Beonic Insights 3.0 Widget Examples

This repository contains example widget definitions for the Beonic Insights 3.0 (i3) platform, organized by metric collections and visualization types.

## Repository Structure

- **Widget Examples**: JSON files defining widget configurations with corresponding PNG visualizations
- **Metric Collections**: Organized in folders under `definitions/` (e.g. `definitions/user-profiles/visits`, `definitions/flight-data`). Folders can be nested to any depth; each folder containing JSON files becomes a category named by its path relative to `definitions/`
- **Templates**: `templates/` holds examples organized by visualization technique rather than by metric
- **Schema**: `schema/widget-definition.schema.json` is a JSON Schema for widget definitions, and `schema/insights-metrics.json` lists the metrics available in Insights with their key fields
- **Visualization Types**: Histograms, charts, tables, and other data presentations

## Documentation

For detailed information about the repository structure, widget architecture, and development patterns, see:

📖 **[CLAUDE.md](CLAUDE.md)** - Comprehensive documentation for AI assistants working with this codebase

## Training Data Generation

This repository includes a script to generate comprehensive training material for LLMs:

### Pre-generated Training Data

A cached `prompt.md` file (74KB+) is available containing:
- All widget examples with titles and descriptions
- Complete JSON configurations  
- AI-analyzed visualization descriptions
- Organized structure by metric collection

### Regenerating Training Data

To update or regenerate the training prompt:

```bash
# Basic generation (uses cached analysis)
node generate-prompt.js

# With Claude Vision API for fresh image analysis
ANTHROPIC_API_KEY=your_key node generate-prompt.js --fresh
```

Without `ANTHROPIC_API_KEY`, the script reuses each PNG's cached `.txt` description. Write the `.txt` for any new PNG by hand before running it, otherwise a generic placeholder description is generated and cached.

See **[README-generate-prompt.md](README-generate-prompt.md)** for detailed script documentation.

## Usage

The generated `prompt.md` serves as training material to help LLMs understand the i3 widget definition language and assist users in creating new widgets based on these examples.

### Widget Structure

Each widget example includes:
- **Title**: From `visualisation.title` in JSON
- **Description**: From `visualisation.description.html` in JSON  
- **Configuration**: Complete JSON widget definition
- **Visualization**: PNG screenshot with AI-generated analysis
- **Organization**: Grouped by metric type and visualization category

### Example Widget Categories

- **user-profiles/campaigns**: Campaign events and performance
- **user-profiles/clicks**: Click analysis by campaign, URL and portal
- **user-profiles/now**: Current user profile demographics, geography and devices
- **user-profiles/registration-group**: User profiles by registration group
- **user-profiles/signups**: Signup analysis
- **user-profiles/visits**: Visit patterns, duration analysis
- **user-profiles/wifi-sessions**: WiFi sessions, venue connectivity
- **flight-data**: Flight check-in, queue wait times and desk processing times, including time-span joins with counter data
- **templates**: Reusable patterns for each visualization type and calculation

## Getting Started

1. Browse widget examples in the `definitions/` directory
2. Reference `CLAUDE.md` for architecture details
3. Use `prompt.md` for LLM training or widget development guidance
4. Run the generator script to create fresh training data when examples are updated

### Example Query for LLM

When using the `prompt.md` training data with an LLM, you can ask for specific widget types. For example, to generate a table visualization:

```
Using the Beonic Insights 3.0 widget examples provided, create a widget configuration that displays a table showing the top 10 venues by total visits in the last 30 days. Include columns for venue name, total visits, and percentage of total traffic. The table should be sortable and show up to 10 rows.
```

The LLM will use the training examples to generate appropriate JSON configuration following the i3 widget definition language patterns.

## Dependencies

- Node.js 18.17 or later (for the prompt and site generation scripts)
- `@anthropic-ai/sdk` (for AI-powered image analysis)

The widget examples themselves are pure JSON and can be used with any compatible system.