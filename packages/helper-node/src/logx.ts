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

type LogxFunc = (...strArr: string[]) => void

class Logx {
  /**
   * 开始 
   */
  start: LogxFunc = (...strArr) => {
    logx(processTypeEnum.START, ...strArr)
  }

  /**
   * 创建 
   */
  create: LogxFunc = (...strArr) => {
    logx(processTypeEnum.CREATE, ...strArr)
  }

  /**
   * 编译 
   */
  compile: LogxFunc = (...strArr) => {
    logx(processTypeEnum.COMPILE, ...strArr)
  }

  /**
   * 转换 
   */
  convert: LogxFunc = (...strArr) => {
    logx(processTypeEnum.CONVERT, ...strArr)
  }

  /**
   * 复制
   */
  copy: LogxFunc = (...strArr) => {
    logx(processTypeEnum.COPY, ...strArr)
  }

  /**
   * 复制
   */
  generate: LogxFunc = (...strArr) => {
    logx(processTypeEnum.GENERATE, ...strArr)
  }

  /**
   * 修改
   */
  modify: LogxFunc = (...strArr) => {
    logx(processTypeEnum.MODIFY, ...strArr)
  }

  /**
   * 错误
   */
  error: LogxFunc = (...strArr) => {
    logx(processTypeEnum.ERROR, ...strArr)
  }

  /**
   * 警告
   */
  warning: LogxFunc = (...strArr) => {
    logx(processTypeEnum.WARNING, ...strArr)
  }

  /**
   * 提示
   */
  remind: LogxFunc = (...strArr) => {
    logx(processTypeEnum.REMIND, ...strArr)
  }

  /**
   * 删除
   */
  unlink: LogxFunc = (...strArr) => {
    logx(processTypeEnum.UNLINK, ...strArr)
  }

  /**
   * 引用
   */
  reference: LogxFunc = (...strArr) => {
    logx(processTypeEnum.REFERENCE, ...strArr)
  }

  /**
   * 插件
   */
  plugin: LogxFunc = (...strArr) => {
    logx(processTypeEnum.PLUGIN, ...strArr)
  }

  /**
   * 读取
   */
  read: LogxFunc = (...strArr) => {
    logx(processTypeEnum.READ, ...strArr)
  }

  /**
   * 结束
   */
  end: LogxFunc = (...strArr) => {
    logx(processTypeEnum.END, ...strArr)
  }
}

/**
 * @param type 类型
 * @param logText 需要打印的文字
 * @param filePath 文件路径
 */
const logx = (type: processTypeEnum, ...rest: string[]) => {
  const typeShow = processTypeMap[type]
  // 如果是字符串颜色，则调用chalk的子方法
  if (typeof typeShow.color === 'string') {
    console.log(chalk[typeShow.color](typeShow.name), '', ...rest)
  } else { 
    // 如果是chalk颜色则直接调用color方法
    console.log(typeShow.color(typeShow.name), '', ...rest)
  }
}

export default new Logx()