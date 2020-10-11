import {
  window,
  ExtensionContext,
  ConfigurationChangeEvent,
  workspace,
  commands,
} from 'vscode'
import { SwitchTheme } from './switchCore'

const switchTheme = new SwitchTheme()

function configChanged(event: ConfigurationChangeEvent) {
  const sundialConfig = event.affectsConfiguration('switchTheme')

  if (sundialConfig) {
    switchTheme.enableExtension()
  }
}

export function activate(context: ExtensionContext) {
  window.showInformationMessage('👏  自动切换Theme插件安装成功')

  context.subscriptions.push(
    workspace.onDidChangeConfiguration(configChanged),
  )
  commands.registerCommand('switchTheme.closeSwitch', () => {
    window.showInformationMessage('🚫 关闭自动切换Theme插件')
    switchTheme.disableExtension()
  })
  commands.registerCommand('switchTheme.openSwitch', () => {
    window.showInformationMessage('✅ 开启切换Theme插件')
    switchTheme.enableExtension()
  })
  switchTheme.enableExtension()
}

export function deactivate() {
  switchTheme.disableExtension()
}
