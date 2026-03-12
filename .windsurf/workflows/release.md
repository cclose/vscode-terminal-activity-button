---
description: Package and publish the extension
---

# Release

Package the extension as a `.vsix` and optionally publish to the VS Code Marketplace.

## Steps

1. **Ensure build is clean:**
   ```bash
   make clean
   make build
   ```

2. **Bump version** in `package.json` (follow semver).

3. **Update CHANGELOG** if one exists.

// turbo
4. **Package the extension:**
   ```bash
   make package
   ```

5. **Publish** (requires a Personal Access Token):
   ```bash
   npx vsce publish
   ```
