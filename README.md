## **简介**

**在不同的时间段内应用不同的主题，通过设置对应的时间区间然后当前时间到达
该区间之后，自动应用该时间段内设置的Theme**

<br /><br />

### **配置表如下**

配置名称 | 用途 | 类型 | 默认值
---------|----------|---------|---------
 defaultTheme | 设置当前时间没有匹配任何时间段时应用的主题 | string | Visual Studio Light
 interval | 设置定时器的检查间隔(单位/S) | number | 1
 switchThemeOptions | 设置时间区间 | array | 请看如下默认配置

<br /><br />

### **默认配置**
```json
"switchTheme.defaultTheme": "Light",
"switchTheme.interval": 1,
"switchTheme.closeSwitch": false
"switchTheme.switchThemeOptions": [
  {
    "useTheme": "Visual Studio Light",
    "startTime": "07:00",
    "endTime": "09:00"
  },
  {
    "useTheme": "Visual Studio Dark",
    "startTime": "09:00",
    "endTime": "22:00"
  }
]
```

<br /><br />

### **switchThemeOptions的详细配置**

**相关属性**

配置名称 | 用途 | 类型 | 默认值
---------|----------|---------|---------
 useTheme | 应用的主题 | string | ""
 startTime | 开始时间 | string | ""
 endTime | 结束时间 | string | ""

<br/>

**switchThemeOptions配置示例如下**
```json
"switchTheme.switchThemeOptions": [
  {
    "useTheme": "Visual Studio Light",
    "startTime": "07:00",
    "endTime": "09:00"
  },
  {
    "useTheme": "Visual Studio Dark",
    "startTime": "09:00",
    "endTime": "22:00"
  }
]
```

<br /><br />

### **相关命令**

**命令面板输入switchTheme然后在相应的配置中选择开关集成**
![相关命令](https://raw.githubusercontent.com/GSZS/switch-theme/main/assets/command.png)

<br /><br />

### **源码地址**

### [源码地址](https://github.com/GSZS/switch-thme)

