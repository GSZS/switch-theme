import { WorkspaceConfiguration, ExtensionContext } from 'vscode'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import * as editConfig from './configEdit'
import { editStatusBarItem } from './statusBar'

// 定义日出 | 日落接口
export interface Sun {
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
}

// 定义分解后的切换配置接口
interface splitSettingTime extends Sun {
  useTheme: string
}

// 定义配置项
export interface SwitchThemeConfig extends WorkspaceConfiguration {
  startTime: string
  switchThemeOptions: WorkspaceConfiguration
}

export class SwitchTheme {
  private enable = true
  private checkInterval!: NodeJS.Timer
  private isRunning = false
  // 储存时间段
  private timeList: Array<splitSettingTime> = []
  public static extensionContext: ExtensionContext
  // 暂存缓存的主题名称
  private cacheTheme = ''

  // 扩展格式化时间
  constructor() {
    dayjs.extend(customParseFormat)
  }

  // 激活扩展
  public enableExtension() {
    this.enable = true
    this.settingToggleTime()
    this.getIntervalTime()
  }

  // 关闭扩展
  public disableExtension() {
    clearInterval(this.checkInterval)
    this.enable = false
  }

  // 获取设置的间隔时间
  public getIntervalTime() {
    const { editSwitchTheme } = editConfig.getConfig()
    if (editSwitchTheme.interval === 0) {
      return
    }
    const interval = 1000 * editSwitchTheme.interval
    this.checkInterval = setInterval(() => {
      this.checkOnTime()
    }, interval)
  }

  // 获取当前时间
  public async getCurrentTime(): Promise<string> {
    const { editSwitchTheme } = editConfig.getConfig()
    // 获取当前时间
    const now = dayjs()
    let theTheme
    // eslint-disable-next-line prettier/prettier
    this.timeList.forEach((hitObj) => {
      const _start = now.isAfter(hitObj.startTime)
      const _end = now.isBefore(hitObj.endTime)
      if (_start && _end) {
        theTheme = hitObj.useTheme
        return
      }
    })
    return theTheme ? theTheme : editSwitchTheme.defaultTheme
  }

  // 设置切换时间
  public settingToggleTime() {
    const { editSwitchTheme } = editConfig.getConfig()
    const { switchThemeOptions } = editSwitchTheme
    const startTime = dayjs(editSwitchTheme.startTime, 'HH:mm')

    if (this.timeList.length > 0) {
      this.timeList = []
    }
    switchThemeOptions.map((switchObj, index) => {
      // 处理fromTime转化为起始与结束区间
      if (switchObj.fromTime) {
        switchObj.startTime =
          this.timeList.length > 0
            ? this.timeList[index - 1].endTime
            : startTime
        switchObj.endTime = startTime.add(
          switchObj.fromTime,
          'minute',
        )
        delete switchObj.fromTime
        this.timeList.push(switchObj)
      }
    })
  }

  // 检查是否需要切换Theme
  public async checkOnTime() {
    if (!this.enable || this.isRunning) {
      return
    }
    this.isRunning = true
    clearInterval(this.checkInterval)

    const currentTime = await this.getCurrentTime()
    if (currentTime !== this.cacheTheme) {
      // 切换主题
      editConfig.switchThemeHandle(currentTime)
      // 更换状态栏显示的当前Theme名称
      editStatusBarItem(currentTime)
    }
    this.cacheTheme = currentTime
    this.isRunning = false
    this.getIntervalTime()
  }
}
