import { window, ExtensionContext, ConfigurationChangeEvent, workspace } from 'vscode';
import { SwitchTheme } from './switchCore';

const switchTheme = new SwitchTheme();

function check() {
  switchTheme.checkOnTime();
}

function configChanged(event: ConfigurationChangeEvent) {
  const sundialConfig = event.affectsConfiguration('switchTheme');

  if (sundialConfig) {
    switchTheme.enableExtension();
  }
}

export function activate(context: ExtensionContext) {
	window.showInformationMessage('👏插件安装成功');
	switchTheme.enableExtension();

	// context.subscriptions.push(window.onDidChangeWindowState(check));
  // context.subscriptions.push(window.onDidChangeActiveTextEditor(check));
  // context.subscriptions.push(window.onDidChangeTextEditorViewColumn(check));
  context.subscriptions.push(workspace.onDidChangeConfiguration(configChanged));
}

export function deactivate() {
	switchTheme.disableExtension();
}

