const chalk = require('chalk')
import { processTypeEnum, processTypeMap } from './constants/constants'

/**
 * logx子方法参数
 */
type LogxFuncParams = {
  title: string
  /**
   * 文件路径
   */
  filePath: string
}

class Logx {
  /**
   * 开始 
   */
  start(params: LogxFuncParams) {
    logx(processTypeEnum.START, params.title, params.filePath)
  }

  /**
   * 创建 
   */
  create(params: LogxFuncParams) {
    logx(processTypeEnum.CREATE, params.title, params.filePath)
  }

  /**
   * 编译 
   */
  compile(params: LogxFuncParams) {
    logx(processTypeEnum.COMPILE, params.title, params.filePath)
  }

  /**
   * 转换 
   */
  convert(params: LogxFuncParams) {
    logx(processTypeEnum.CONVERT, params.title, params.filePath)
  }

  /**
   * 复制
   */
  copy(params: LogxFuncParams) {
    logx(processTypeEnum.COPY, params.title, params.filePath)
  }

  /**
   * 复制
   */
  generate(params: LogxFuncParams) {
    logx(processTypeEnum.GENERATE, params.title, params.filePath)
  }

  /**
   * 修改
   */
  modify(params: LogxFuncParams) {
    logx(processTypeEnum.MODIFY, params.title, params.filePath)
  }

  /**
   * 错误
   */
  error(params: LogxFuncParams) {
    logx(processTypeEnum.ERROR, params.title, params.filePath)
  }

  /**
   * 警告
   */
  warning(params: LogxFuncParams) {
    logx(processTypeEnum.WARNING, params.title, params.filePath)
  }

  /**
   * 提示
   */
  remind(params: LogxFuncParams) {
    logx(processTypeEnum.REMIND, params.title, params.filePath)
  }

  /**
   * 删除
   */
  unlink(params: LogxFuncParams) {
    logx(processTypeEnum.UNLINK, params.title, params.filePath)
  }

  /**
   * 引用
   */
  reference(params: LogxFuncParams) {
    logx(processTypeEnum.REFERENCE, params.title, params.filePath)
  }
}

/**
 * @param type 类型
 * @param logText 需要打印的文字
 * @param filePath 文件路径
 */
const logx = (type: processTypeEnum, logText: string, filePath: string) => {
  const typeShow = processTypeMap[type]
  // 如果是字符串颜色，则调用chalk的子方法
  if (typeof typeShow.color === 'string') {
    console.log(chalk[typeShow.color](typeShow.name), '', logText, '', filePath)
  } else { 
    // 如果是chalk颜色则直接调用color方法
    console.log(typeShow.color(typeShow.name), '', logText, '', filePath)
  }
}

export default new Logx()