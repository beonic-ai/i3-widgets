# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a widgets repository containing JSON configuration files for data visualization components. The widgets are organized by category and support various visualization types including tables, charts, histograms, and dashboards.

## Architecture

### Core Structure
- **Widget Definitions**: All widgets are defined as JSON configuration files that specify visualization settings, data expressions, and layout
- **Template System**: `templates/` contains reusable widget configurations for common visualization patterns
- **Category Organization**: Widgets are organized into domain-specific folders (UserProfiles*, campaigns, clicks, visits, WiFi sessions)
- **Dashboard Integration**: `blix/dashboards/` contains dashboard compositions that combine multiple widgets

### Key Widget Components
Each widget JSON file follows a consistent structure:
- `visualisation`: Defines title, description, type, and display settings
- `columnNames`: Array of column headers for the data
- `rowSets`: Array of data column definitions with dimensions and expressions
- `filterOverrides`: Optional filters to override default data selection

### Widget Types
- **Tables**: Display data in tabular format with sorting and pagination
- **Charts**: Bar charts, line charts, pie charts for visual data representation
- **Numbers**: Single metric displays with delta comparisons
- **Histograms**: Statistical distribution visualizations with configurable buckets

### Data Expression System
- **Metrics**: Reference to data sources (e.g., "BlixVisit", "UserProfilesNow", "counters")
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
- Dashboard folders are kebab-case with clear business purpose names

## Development Notes
- This is a data visualization configuration repository, not a code project
- No build process, testing framework, or package management required
- Widget files can be directly edited to modify visualizations
- The `qic/qic.js` file contains JavaScript code for generating complex widget configurations programmatically