---
description: Build and test the extension
---

# Build and Test

Compile the extension, install it locally, and verify it works.

## Steps

// turbo
1. **Build the extension:**
   ```bash
   make build
   ```

2. **Run lint** (when configured):
   ```bash
   make lint
   ```

3. **Install into Windsurf:**
   ```bash
   make install-windsurf
   ```

4. **Reload Windsurf** (`Cmd+Shift+P` → "Reload Window") and verify the terminal button appears.
