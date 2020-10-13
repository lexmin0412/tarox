const child = require('child_process');
import { checkTaroVersion } from './utils'

export default (ctx, options) => {
  const {
    ENV_LIST
  } = options
  const {
    initialConfig: {
      defineConstants: {
        APP_CONF
      }
    },
    helper: {
      chalk
    }
  } = ctx

  ctx.onBuildStart(() => {
    const {
      runOpts: {
        platform
      }
    } = ctx
    console.log(ctx.helper.chalk.yellow('插件 '), 'taro-plugin-check-env');
    console.log(ctx.helper.chalk.greenBright('开始 '), '检查环境变量');

    try {
      // 通过执行taro -v命令获取当前taro版本号
      const sto = child.execSync('taro -v').toString()
      const versionStartIndex = sto.indexOf('Taro v') + 6
      const versionEndIndex = sto.indexOf('\n', versionStartIndex + 3)
      const taroVersion = sto.slice(versionStartIndex, versionEndIndex)

      const versionTestResult = checkTaroVersion(platform, taroVersion, options)
      if (versionTestResult.success) {
        console.log(chalk.blueBright('结果 '),'taro 版本检查通过✅', taroVersion)

        for (const key in ENV_LIST) {
          if (ENV_LIST.hasOwnProperty(key)) {
            const element = ENV_LIST[key];
            if (!APP_CONF[key]) {
              console.log(chalk.red('错误 '), `缺少环境变量: ${element} - ${key}`);
              throw '环境变量检查不通过';
            } else {
              console.log(`${chalk.magentaBright('读取 ')}`, `${key} `, APP_CONF[key]);
            }
          }
        }
        console.log(chalk.blueBright('结束 '), '环境变量检查通过✅');
        console.log('');
      } else {
        throw new Error(`依赖版本检查不通过: ${versionTestResult.errMsg}`);
      }
    } catch (err) {
      throw new Error(`执行taro版本检查脚本失败: ${err}`);
    } 
  });
}