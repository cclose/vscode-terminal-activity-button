# Terminal Activity Button — Specification

> Single source of truth for extension behavior and design decisions.

## Purpose

Provide a dead-simple, lightweight button to open/close the VS Code terminal panel — in the Activity Bar, the Status Bar, or both.

## Design Principles

- **Lightweight above all.** Minimal code, minimal dependencies, tiny bundle.
- **Zero configuration required.** Works out of the box with sensible defaults.
- **Configurable for power users.** Every visible element can be toggled off.

## Phase 1 — MVP

### Commands

| Command ID | Behavior |
|---|---|
| `terminal-activity-button.openTerminal` | Opens/focuses the terminal. Never closes it. |
| `terminal-activity-button.toggleTerminal` | Opens if closed, focuses if unfocused, closes if focused. |

### UI Elements

**Activity Bar Button**
- View container with terminal icon in the Activity Bar.
- Click behavior determined by `activityBarMode` setting.
- Can be hidden via `showInActivityBar` setting.

**Status Bar Button**
- Left-aligned status bar item with `$(terminal)` icon.
- Always fires `openTerminal` (never closes).
- Can be hidden via `showInStatusBar` setting.

### Configuration

| Setting | Type | Default | Description |
|---|---|---|---|
| `terminal-activity-button.showInActivityBar` | boolean | `true` | Show button in Activity Bar |
| `terminal-activity-button.showInStatusBar` | boolean | `true` | Show button in Status Bar |
| `terminal-activity-button.activityBarMode` | `"toggle"` \| `"open"` | `"toggle"` | Activity Bar click behavior |

### Toggle Logic Detail

**`openTerminal`:**
1. If an active terminal exists → show/focus it
2. Otherwise → create a new terminal (via `workbench.action.terminal.toggleTerminal`)

**`toggleTerminal`:**
1. If terminal panel is not visible → open it
2. If terminal panel is visible but editor is focused → focus terminal
3. If terminal panel is visible and focused → close panel

## Phase 2 — Roadmap

- **Sidebar view**: Terminal list, activity indicators, right-click "Open Sidebar" from Activity Bar
- **Activity indicator**: `onDidWriteTerminalData` → icon badge on unread terminal output
- **Badge count**: Show number of active terminals on the icon
- **Custom icon**: Let users pick their own codicon
- **Terminal selector**: Dropdown to pick which terminal to focus
