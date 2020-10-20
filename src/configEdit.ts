import { workspace, WorkspaceConfiguration } from 'vscode'
import { SwitchThemeConfig } from './switchCore'

// 设置编辑器配置的接口
export interface EditConfig {
  editSwitchTheme: SwitchThemeConfig
  workbench: WorkspaceConfiguration
}

// 获取首选项中的配置
export function getConfig(): EditConfig {
  const editSwitchTheme = workspace.getConfiguration(
    'switchTheme',
  ) as SwitchThemeConfig
  const workbench = workspace.getConfiguration('workbench')
  return {
    editSwitchTheme,
    workbench,
  }
}

// 切换Theme
export function switchThemeHandle(newTheme: string): void {
  const { workbench } = getConfig()
  if (newTheme && newTheme !== workbench.colorTheme) {
    workbench.update('colorTheme', newTheme, true)
  }
}
