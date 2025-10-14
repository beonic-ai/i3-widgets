# Beonic Insights Widgets - Justfile

# Default recipe - show available commands
default:
    @just --list

# Generate the prompt.md file from widget examples
generate-prompt: bootstrap
    @if [ -z "$ANTHROPIC_API_KEY" ]; then \
        echo "Error: ANTHROPIC_API_KEY environment variable is not set"; \
        exit 1; \
    fi
    node generate-prompt.js

# Generate the prompt.md file with fresh image analysis (no cache)
generate-prompt-fresh: bootstrap
    @if [ -z "$ANTHROPIC_API_KEY" ]; then \
        echo "Error: ANTHROPIC_API_KEY environment variable is not set"; \
        exit 1; \
    fi
    node generate-prompt.js --no-cache

# Generate the static site gallery
generate-site: bootstrap
    node generate-site.js

# Clean generated files
clean:
    rm -rf dist/
    @echo "Cleaned dist/ directory"

# Preview the generated site
serve: generate-site
    cd dist && npx serve

# Find widgets missing PNG previews
check-previews:
    @echo "Widgets missing PNG previews:"
    @for json in UserProfile*/*.json templates/*.json; do \
        png="$${json%.json}.png"; \
        if [ ! -f "$$png" ]; then \
            echo "  $json"; \
        fi \
    done
    @echo
    @echo "Widgets missing TXT descriptions:"
    @for json in UserProfile*/*.json templates/*.json; do \
        txt="$${json%.json}.txt"; \
        if [ ! -f "$$txt" ]; then \
            echo "  $json"; \
        fi \
    done

# Validate JSON files for syntax errors
validate-json:
    @echo "Validating JSON files..."
    @errors=0; \
    for json in UserProfile*/*.json templates/*.json; do \
        if ! node -e "JSON.parse(require('fs').readFileSync('$json', 'utf8'))" 2>/dev/null; then \
            echo "  ❌ $json"; \
            errors=$((errors + 1)); \
        fi \
    done; \
    if [ $errors -eq 0 ]; then \
        echo "  ✅ All JSON files are valid"; \
    else \
        echo ""; \
        echo "  Found $errors invalid JSON file(s)"; \
        exit 1; \
    fi

# Full build: clean, validate, and regenerate everything
build: clean validate-json generate-prompt generate-site
    @echo ""
    @echo "✅ Build complete!"
    @echo "   - prompt.md updated"
    @echo "   - Static site generated in dist/"

# Install dependencies (if needed)
bootstrap:
    @if [ ! -d "node_modules" ]; then \
        echo "Installing Node.js dependencies..."; \
        npm install; \
    else \
        echo "Dependencies already installed"; \
    fi
