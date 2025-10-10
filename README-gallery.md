# Widget Gallery - Deployment Guide

A browseable web gallery of Beonic Insights 3.0 widget examples, designed for deployment to Cloudflare Pages.

## Quick Start

### 1. Generate the Gallery

```bash
npm run build
```

This will:
- Scan all `UserProfile*` directories for widget triplets (JSON, PNG, TXT)
- Generate a static site in the `dist/` directory
- Create individual pages for each widget with copyable JSON

### 2. Preview Locally

After building, you can preview the site locally:

```bash
cd dist
python3 -m http.server 8000
# or
npx serve
```

Then open http://localhost:8000 in your browser.

## Deploying to Cloudflare Pages

### Option 1: Automatic Deployment (Recommended)

1. **Connect your repository to Cloudflare Pages:**
   - Go to https://dash.cloudflare.com
   - Navigate to Pages → Create a project
   - Connect your Bitbucket repository

2. **Configure build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: (leave empty or `/`)
   - Node version: 18 or later

3. **Deploy:**
   - Push to your main branch
   - Cloudflare Pages will automatically build and deploy

### Option 2: Manual Deployment

1. **Build the site locally:**
   ```bash
   npm run build
   ```

2. **Deploy via Wrangler CLI:**
   ```bash
   npx wrangler pages deploy dist --project-name=widget-gallery
   ```

## Adding New Widgets

1. Add your widget triplet to the appropriate `UserProfile*` directory:
   - `your-widget.json` - Widget definition
   - `your-widget.png` - Screenshot/preview
   - `your-widget.txt` - Description and insights

2. Rebuild the gallery:
   ```bash
   npm run build
   ```

3. Commit and push (if using automatic deployment)

## Site Structure

The generated site includes:

- **Index page** (`index.html`) - Grid view of all widgets with search and filtering
- **Widget pages** (`{category}/{widget-name}.html`) - Individual pages for each widget
- **Assets** - PNG images organized by category

## Features

- 🔍 **Search** - Find widgets by title or description
- 🏷️ **Filter by Category** - Filter by UserProfileCampaigns, UserProfileVisits, etc.
- 📊 **Filter by Type** - Filter by Table, BarChart, PieChart, etc.
- 📋 **One-click Copy** - Copy widget JSON definitions to clipboard
- 🔗 **Shareable URLs** - Each widget has its own URL
- 📱 **Responsive** - Works on desktop and mobile

## Customization

Edit `generate-site.js` to customize:
- Colors and styling (in the `<style>` sections)
- Page layout and structure
- Additional metadata or features

## Troubleshooting

**Build fails:**
- Ensure Node.js 18+ is installed
- Check that all widget JSON files are valid
- Look for error messages in the console

**Missing images:**
- Ensure PNG files are named exactly like JSON files
- Check file permissions

**Deployment fails on Cloudflare:**
- Verify build command is `npm run build`
- Verify output directory is `dist`
- Check Cloudflare Pages build logs for errors
