# taro-plugin-check-env

taro插件，用于在编译前的环境检查，包括以下功能：

- taro版本检查
- 环境变量检查

## Installation

```bash
npm install taro-plugin-check-env -D -S
```

## Usage

在 config/index.js 中配置 plugins

```js
// config/index.js

const config = {
  plugins: [
    [
      // 环境变量检查插件
      'taro-plugin-check-env',
      {
        // 配置需要检查的环境变量
        ENV_LIST: {
          CUSTOMIZE_ENV: '自定义环境变量',
          API_HOST: '接口API域名',
          APPID: '小程序APPID',
          API_MAP_QQ: '腾讯地图API/WebService域名',
          KEY_MAP_QQ: '腾讯地图Key',
        },
        // 指定不同平台对应的taro版本
        taroVersion: {
          h5: '2.2.7',
          weapp: '2.2.11'
        }
      },
    ]
  ]
}
```

在编译初始阶段，插件将会在命令行中打印出传入的环境变量列表的检查结果，如果缺少变量则会抛出错误。
