import { window } from 'vscode'

const _statusBarItem = window.createStatusBarItem(1, 6)

export const editStatusBarItem = (themeName: string): void => {
  // 设置底部状态栏的位置
  _statusBarItem.text = ''
  _statusBarItem.text = `🌈 当前主题名称: ${themeName}`
  _statusBarItem.show()
}
