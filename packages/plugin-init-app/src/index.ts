import getPages from './getPages'
import initApp from './initApp'
import getComponent from './getComponents'
import getSubPackages from './getSubPackages'
import { Logx } from '@tarox/helper-node'

export default (ctx, options) => {
  ctx.onBuildStart(() => {
    Logx.plugin('taro-plugin-init-app')
    Logx.start('初始化入口配置')

    // 扫描页面
    Promise.all([
      getPages(ctx, options),
      getSubPackages(ctx, options)
    ]).then((res: Array<any>)=>{
      initApp({
        pages: res[0], 
        subPackages: res[1],
        ctx
      })
    })
    // 获取所有组件生成文件名
    getComponent(options)
  })
}