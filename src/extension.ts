import * as vscode from "vscode";

const EXTENSION_ID = "terminal-activity-button";
const CMD_OPEN = `${EXTENSION_ID}.openTerminal`;
const CMD_TOGGLE = `${EXTENSION_ID}.toggleTerminal`;
const CFG_SHOW_STATUS_BAR = "showInStatusBar";
const CFG_ACTIVITY_BAR_MODE = "activityBarMode";
const VIEW_ID = `${EXTENSION_ID}.view`;

let statusBarItem: vscode.StatusBarItem | undefined;

function getConfig(): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration(EXTENSION_ID);
}

async function openTerminal(): Promise<void> {
  if (vscode.window.activeTerminal) {
    vscode.window.activeTerminal.show();
  } else {
    vscode.commands.executeCommand("workbench.action.terminal.toggleTerminal");
  }
}

async function toggleTerminal(): Promise<void> {
  const isTerminalFocused =
    vscode.window.activeTextEditor === undefined &&
    vscode.window.activeTerminal !== undefined;

  if (isTerminalFocused) {
    vscode.commands.executeCommand("workbench.action.togglePanel");
  } else {
    openTerminal();
  }
}

function createStatusBarItem(): void {
  if (statusBarItem) {
    statusBarItem.dispose();
    statusBarItem = undefined;
  }

  const showInStatusBar = getConfig().get<boolean>(CFG_SHOW_STATUS_BAR, true);
  if (!showInStatusBar) {
    return;
  }

  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    -1000
  );
  statusBarItem.text = "$(terminal)";
  statusBarItem.tooltip = "Open Terminal";
  statusBarItem.command = CMD_OPEN;
  statusBarItem.show();
}

function handleActivityBarClick(): void {
  const mode = getConfig().get<string>(CFG_ACTIVITY_BAR_MODE, "toggle");
  if (mode === "open") {
    openTerminal();
  } else {
    toggleTerminal();
  }
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(CMD_OPEN, openTerminal),
    vscode.commands.registerCommand(CMD_TOGGLE, toggleTerminal)
  );

  // Activity Bar view — clicking the icon fires the configured terminal command
  const treeView = vscode.window.createTreeView(VIEW_ID, {
    treeDataProvider: new TerminalTreeProvider(),
  });
  treeView.onDidChangeVisibility((e) => {
    if (e.visible) {
      handleActivityBarClick();
    }
  });
  context.subscriptions.push(treeView);

  createStatusBarItem();
  if (statusBarItem) {
    context.subscriptions.push(statusBarItem);
  }

  // Recreate status bar item when configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
      if (e.affectsConfiguration(EXTENSION_ID)) {
        createStatusBarItem();
        if (statusBarItem) {
          context.subscriptions.push(statusBarItem);
        }
      }
    })
  );
}

export function deactivate(): void {
  if (statusBarItem) {
    statusBarItem.dispose();
    statusBarItem = undefined;
  }
}

// Minimal tree data provider — the view container is just a click target
class TerminalTreeProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(): vscode.TreeItem {
    return new vscode.TreeItem("Terminal");
  }

  getChildren(): string[] {
    // Return empty so the welcome content shows instead
    return [];
  }
}
