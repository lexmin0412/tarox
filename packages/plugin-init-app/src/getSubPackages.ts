const fs = require('fs');
import isFileSupported from './utils/fiterSuffix'
import { Logx } from '@tarox/helper-node'

/**
 * 判断一个path是否是文件夹
 */
const isDirectory = (path) => {
  return fs.lstatSync(path).isDirectory()
}

/**
 * 需要过滤的文件夹
 */
const filterDirs = [
  'assets', 
  'components', 
  'constants',
  'component',
  'enums',
  'css', 
  'interceptors',
  'interface',
  'lib',
  'services', 
  'styles',
  'utils'
]

/**
 * 数组去重
 * @param {*} weapp
 * @param {*} h5
 * @param {*} ctx
 * @param {*} pages
 * @param {*} path
 */
const handlePurifyArr = (weapp, h5, ctx, pages, subPackageItem, path) => {
  // 去重
  if (pages.indexOf(path) === -1 && path) {
    // 拼接后的路由
    const sliceResPageRoute = path;

    subPackageItem = subPackageItem

    if ((weapp && ctx.runOpts.platform === 'weapp') || (h5 && ctx.runOpts.platform === 'h5')) {
      // handleMPFilter(weapp, ctx, pages, sliceResPageRoute)
      // handleH5Filter(h5, ctx, pages, sliceResPageRoute)
      // return
    }

    return sliceResPageRoute
  }
}

/**
 * 扫描pages文件夹生成routes.js 即app.tsx中的pages配置项
 */
const getSubPackages = (ctx, options) => {
  return new Promise(resolve => {
    const { compSuffix, subPackages: subPackagesConfig} = options;

    Logx.start('进入扫描分包插件')

    if (fs.existsSync('./src/subPackages.js')) {
      fs.unlinkSync('./src/subPackages.js')
      Logx.unlink('清除旧的路由文件', 'src/subPackages.js')
    }

    let excludesSubPackages: any[] = [];
    let includesSubPackages: any[] = []
    if (subPackagesConfig && subPackagesConfig.excludes) {
      excludesSubPackages = subPackagesConfig.excludes;
    }
    if (subPackagesConfig && subPackagesConfig.includes) {
      includesSubPackages = subPackagesConfig.includes;
    }
    let indexLines = `
/**
 * 分包页面列表，由插件自动生成
 */
const subPackages = [`;
    const subPackages: any[] = [];
    const outerDirs = fs.readdirSync('./src');

    /**
     * 验证规则
     */
    const testFunc = (item: any) => {
      // 优先判断includes 如果没有includes则判断excludes
      if (includesSubPackages && includesSubPackages.length) {
        return includesSubPackages.includes(item)
      } else if (excludesSubPackages && excludesSubPackages.length) {
        return !['.DS_Store', ...excludesSubPackages].includes(item)
      }
    }

    outerDirs.forEach(item => {
      // 跳过特殊文件夹
      if (testFunc(item) && isDirectory(`./src/${item}`)) {
        Logx.read('发现分包', item)
        let subPackageItem: any = ``;
        subPackageItem = indexLines.indexOf('root') > -1 ?
          `,
  {
    root: '${item}',
    name: '${item}',
    pages: [`
    :        
`
  {
    root: '${item}',
    name: '${item}',
    pages: [`
        const innerDir = fs.readdirSync(`./src/${item}`);
        // 去除后缀名
        innerDir.forEach(inItem => {
          // 非页面文件夹过滤
          if (filterDirs.includes(inItem)) {
            return;
          }
          // 如果是文件夹则再次遍历
          if (isDirectory(`./src/${item}/${inItem}`)) {
            const deepInnerDir = fs.readdirSync(`./src/${item}/${inItem}`);
            deepInnerDir.forEach(deepInnerItem => {
              // 判断deepInnerItem为空时不做任何处理
              if ( !deepInnerItem ) {
                return
              }
              // 过滤文件类型
              if (compSuffix && !isFileSupported(deepInnerItem, compSuffix)) {
                return
              }
              if (filterDirs.includes(deepInnerItem)) {
                return;
              }
              const sliceResPageRoute = deepInnerItem.slice(0, deepInnerItem.indexOf('.'));
              // 数组去重
              subPackageItem = `${subPackageItem}
                '${sliceResPageRoute}',`
            });
          }
          else {
            // 过滤文件类型
            if (compSuffix && !isFileSupported(inItem, compSuffix)) {
              return
            }
            const sliceRes = inItem.slice(0, inItem.indexOf('.'));
            // handlePurifyArr(weapp, h5, ctx, subPackageItem, item, `${sliceRes}`);
            subPackageItem = `${subPackageItem}
      '${sliceRes}',`
          }
        });
        indexLines = `${indexLines}${subPackageItem}
    ]
  }`
      }
    });
    indexLines = `
    ${indexLines}
]

module.exports = subPackages`;
    console.log('indexLines', indexLines)
    fs.writeFileSync('./src/subPackages.js', indexLines)
    Logx.create('./src/subPackages.js', '成功')
    console.log('')
    Logx.end('分包页面扫描完成✅')
    console.log(``)
    resolve(subPackages)
  });
};

export default getSubPackages