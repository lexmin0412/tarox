const fs = require('fs')
import isFileSupported from './utils/fiterSuffix'
import { Logx } from '@tarox/helper-node'

/**
 * 扫描pages文件夹生成routes.js 即app.tsx中的pages配置项
 */
const getPages = (ctx, options) => {
  return new Promise(resolve => {
    const {homeRoute, compSuffix, weapp, h5 } = options
    Logx.start('进入扫描页面插件')

    if (fs.existsSync('./src/pages/routes.js')) {
      fs.unlinkSync('./src/pages/routes.js')
      Logx.unlink('清除旧的路由文件', 'pages/route.js')
    }

    let indexLines = `/**
 * 路由文件 编译时自动生成，无需手动修改，但页面有增删改操作时需要重启项目
 */

const pages = [
  '${homeRoute}',`
    const pages: any = []

    const outerDirs = fs.readdirSync('./src/pages')

    outerDirs.forEach(item => {
      // 跳过特殊文件夹
      if (!['.DS_Store'].includes(item)) {
        const innerDir = fs.readdirSync(`./src/pages/${item}`)

        // 去除后缀名
        innerDir.forEach(inItem => {
          // 过滤文件类型
          if (compSuffix && !isFileSupported(inItem, compSuffix)) {
            return
          }
          
          const sliceRes = inItem.slice(0, inItem.indexOf('.'));
          
          // 去重
          if (pages.indexOf(`pages/${item}/${sliceRes}`) === -1 &&
            !['component'].includes(sliceRes)) {
            // 拼接后的路由
            const sliceResPageRoute = `pages/${item}/${sliceRes}`;
            Logx.read('发现页面', sliceResPageRoute)
						/**
						 * 小程序配置处理
						 */
            if (weapp && ctx.runOpts.platform === 'weapp') {
              if (weapp.pages) {
                const {
                  includes,
                  excludes
                } = weapp.pages;
                // 有includePages时优先判断
                if (includes) {
                  if (includes.includes(sliceResPageRoute)) {
                    pages.push(sliceResPageRoute);
                    return;
                  }
                  return
                }
                if (excludes) {
                  if (!excludes.includes(sliceResPageRoute)) {
                    pages.push(sliceResPageRoute);
                    return;
                  }
                  return
                }
                pages.push(sliceResPageRoute);
                return;
              }
              pages.push(sliceResPageRoute);
              return;
            } else if (h5 && ctx.runOpts.platform === 'h5') {
							/**
							 * h5配置处理
							 */
              if (h5.pages) {
                const {
                  includes,
                  excludes
                } = h5.pages;
                // 有includePages时优先判断
                if (includes) {
                  if (includes.includes(sliceResPageRoute)) {
                    pages.push(sliceResPageRoute);
                    return;
                  }
                  return
                }
                if (excludes) {
                  if (!excludes.includes(sliceResPageRoute)) {
                    pages.push(sliceResPageRoute);
                    return;
                  }
                  return
                }
                pages.push(sliceResPageRoute);
                return;
              }
              pages.push(sliceResPageRoute);
              return;
            }
            pages.push(sliceResPageRoute);
          }
        });
      }
    })

    pages.forEach(item => {
      if (item !== homeRoute) {
        indexLines = indexLines
          ? `${indexLines}
  '${item}',`
          : `'${item}',`
      }
    })

    indexLines = `${indexLines}

]

module.exports = pages`

    let resolvePages = [
      homeRoute
    ]
    pages.forEach(element => {
      if (element !== homeRoute ) {
        resolvePages.push(element)
      }
    });

    fs.writeFileSync('./src/pages/routes.js', indexLines)
    Logx.create('pages/routes.js', '成功')
    console.log('')
    Logx.end('页面扫描完成✅')
    console.log('')
    resolve(resolvePages)
  })
}

export default getPages