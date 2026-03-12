# Terminal Activity Button

A dead-simple, lightweight VS Code extension that adds a terminal toggle button to the Activity Bar and Status Bar.

**Why?** Because there's no reason you should have to memorize `Cmd+Shift+`` just to open a terminal.

## Features

- **Activity Bar button** — a terminal icon right there with Explorer, Search, and Git
- **Status Bar button** — a small `$(terminal)` icon in the bottom bar
- **Configurable** — show either, both, or neither; choose toggle vs. open-only behavior

## Install

### From Source (Local Install)

```bash
git clone https://github.com/cclose/vscode-terminal-activity-button.git
cd vscode-terminal-activity-button
npm install
make package
code --install-extension terminal-activity-button-0.1.0.vsix
```

Then reload VS Code (`Cmd+Shift+P` → "Reload Window").

### From `.vsix` (Pre-built)

If someone hands you a `.vsix` file:

```bash
code --install-extension terminal-activity-button-0.1.0.vsix
```

### From VS Code Marketplace

Not published yet. See [Publishing](#publishing) below.

## Publishing

To publish to the VS Code Marketplace:

1. **Create a publisher** at https://marketplace.visualstudio.com/manage if you don't have one.

2. **Get a Personal Access Token (PAT)** from https://dev.azure.com — the token needs the **Marketplace > Manage** scope.

3. **Login with `vsce`:**
   ```bash
   npx vsce login <your-publisher-name>
   ```

4. **Publish:**
   ```bash
   npx vsce publish
   ```

   Or to bump version and publish in one step:
   ```bash
   npx vsce publish patch   # 0.1.0 → 0.1.1
   npx vsce publish minor   # 0.1.0 → 0.2.0
   ```

5. The extension will be live at `https://marketplace.visualstudio.com/items?itemName=<publisher>.terminal-activity-button` within a few minutes.

## Configuration

| Setting | Type | Default | Description |
|---|---|---|---|
| `terminal-activity-button.showInActivityBar` | boolean | `true` | Show terminal button in Activity Bar |
| `terminal-activity-button.showInStatusBar` | boolean | `true` | Show terminal button in Status Bar |
| `terminal-activity-button.activityBarMode` | `"toggle"` \| `"open"` | `"toggle"` | Activity Bar click: toggle (open/focus/close) or open (open/focus only) |

## Commands

| Command | Description |
|---|---|
| `Terminal Button: Open Terminal` | Opens or focuses the terminal (never closes) |
| `Terminal Button: Toggle Terminal` | Opens, focuses, or closes the terminal |

## Development

```bash
make help       # Show all targets
make build      # Build with esbuild
make watch      # Build + watch
make lint       # ESLint
make format     # Prettier
make package    # Package as .vsix
make clean      # Remove build artifacts
```

## Roadmap

- Activity indicator (icon badge on unread terminal output)
- Terminal badge count
- Custom icon support
- Sidebar view with terminal list

## License

BSD-3-Clause
