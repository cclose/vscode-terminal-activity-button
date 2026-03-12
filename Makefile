.PHONY: help build watch lint format format-check package clean

help: ## Show available targets
	@echo "terminal-activity-button — Makefile targets"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: node_modules ## Build the extension
	@node esbuild.js

watch: node_modules ## Build and watch for changes
	@node esbuild.js --watch

lint: node_modules ## Run ESLint
	@npx eslint src/ --ext .ts

format: node_modules ## Format code with Prettier
	@npx prettier --write "src/**/*.ts"

format-check: node_modules ## Check code formatting
	@npx prettier --check "src/**/*.ts"

package: build ## Package as .vsix
	@npx vsce package

clean: ## Remove build artifacts
	@rm -rf dist out *.vsix

node_modules: package.json
	@npm install
	@touch node_modules
