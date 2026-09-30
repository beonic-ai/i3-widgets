# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a widgets repository containing JSON configuration files for data visualization components. The widgets are organized by category and support various visualization types including tables, charts, histograms, and dashboards.

## Architecture

### Core Structure
- **Widget Definitions**: All widgets are defined as JSON configuration files that specify visualization settings, data expressions, and layout
- **Template System**: `templates/` contains reusable widget configurations for common visualization patterns
- **Category Organization**: Widgets are organized into domain-specific folders under `definitions/` (e.g. `definitions/user-profiles/visits`, `definitions/flight-data`). Folders can be nested to any depth; each folder containing JSON files is a category named by its path relative to `definitions/`
- **Widget Triplets**: Each widget is a `.json` definition with an optional `.png` screenshot and `.txt` description sharing the same base name
- **Schema**: `schema/widget-definition.schema.json` is the JSON Schema for widget definitions, derived from the backend `MetricTableDefinition` codecs and the frontend `V3WidgetDefinition` type. `schema/insights-metrics.json` lists the metrics available in Insights with their single and multi key fields
- **Dashboard Integration**: `blix/dashboards/` contains dashboard compositions that combine multiple widgets

### Key Widget Components
Each widget JSON file follows a consistent structure:
- `visualisation`: Defines title, description, type, and display settings
- `columnNames`: Array of column headers for the data
- `rowSets`: Array of data column definitions with dimensions and expressions
- `filterOverrides`: Optional filters to override default data selection
- `keyAliases`: Optional additional keys, often entity expressions such as `"deskId.queue"`, referenced by dimensions and metric expressions

### Widget Types
- **Tables**: Display data in tabular format with sorting and pagination
- **Charts**: Bar charts, line charts, pie charts for visual data representation
- **Numbers**: Single metric displays with delta comparisons
- **Histograms**: Statistical distribution visualizations with configurable buckets

### Data Expression System
- **Metrics**: Reference to data sources (e.g., "UserProfilesNow", "counters", "FlightData"). Valid metric names and their keys are listed in `schema/insights-metrics.json`
- **Time-Span Joins**: A join metric such as `{"aggregateMetric": "counters", "timeSpanMetric": "FlightData"}` restricts counter data to the time spans of another metric (e.g. while a flight is assigned to its desks)
- **Dimensions**: Grouping criteria including time-based dimensions (Daily, Monthly, DayOfWeekType) and categorical dimensions
- **Date Ranges**: Support for relative date calculations and year-over-year comparisons
- **Mathematical Operations**: Built-in functions like `$divide`, `$subtract` for calculated fields

### Dashboard Organization
The `blix/dashboards/` directory contains pre-built dashboard configurations organized by business function:
- CEO reporting dashboards
- Sales performance and conversion tracking
- Traffic analysis and comparison tools
- Operational daily/hourly monitoring

## File Naming Conventions
- Widget files use descriptive names indicating the data and visualization type
- Histogram files follow pattern: `histogram-[field]-[buckets]-[visualization].json`
- Dashboard folders and category folders under `definitions/` are kebab-case with clear business purpose names

## Development Notes
- This is a data visualization configuration repository; widget files can be directly edited to modify visualizations
- `generate-prompt.js` builds `prompt.md` (LLM training material) and `generate-site.js` builds the static gallery in `dist/`; both require Node.js 18.17+
- `justfile` recipes: `validate-json`, `check-previews`, `generate-prompt`, `generate-site`, `serve`, `build`
- `generate-prompt.js` describes new PNGs with the Claude Vision API and caches the result as `.txt`. Without `ANTHROPIC_API_KEY`, write the `.txt` by hand and run `node generate-prompt.js` directly
- Screenshots and descriptions are published in the gallery and `prompt.md`, so they must not contain customer data