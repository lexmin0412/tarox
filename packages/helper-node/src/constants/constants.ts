import * as chalk from 'chalk'

export const enum processTypeEnum {
  START = 'start',
  CREATE = 'create',
  COMPILE = 'compile',
  CONVERT = 'convert',
  COPY = 'copy',
  GENERATE = 'generate',
  MODIFY = 'modify',
  ERROR = 'error',
  WARNING = 'warning',
  UNLINK = 'unlink',
  REFERENCE = 'reference',
  REMIND = 'remind',
  PLUGIN = 'plugin',
  READ = 'read',
  END = 'end'
}

export interface IProcessTypeMap {
  [key: string]: {
    name: string,
    color: string | chalk.Chalk
  }
}

export const processTypeMap: IProcessTypeMap = {
  [processTypeEnum.CREATE]: {
    name: '创建',
    color: 'cyan'
  },
  [processTypeEnum.COMPILE]: {
    name: '编译',
    color: 'green'
  },
  [processTypeEnum.CONVERT]: {
    name: '转换',
    color: 'green'
  },
  [processTypeEnum.COPY]: {
    name: '拷贝',
    color: 'magenta'
  },
  [processTypeEnum.GENERATE]: {
    name: '生成',
    color: 'blue'
  },
  [processTypeEnum.MODIFY]: {
    name: '修改',
    color: 'yellow'
  },
  [processTypeEnum.ERROR]: {
    name: '错误',
    color: 'red'
  },
  [processTypeEnum.WARNING]: {
    name: '警告',
    color: 'yellowBright'
  },
  [processTypeEnum.UNLINK]: {
    name: '删除',
    color: 'magenta'
  },
  [processTypeEnum.START]: {
    name: '开始',
    color: 'green'
  },
  [processTypeEnum.REFERENCE]: {
    name: '引用',
    color: 'blue'
  },
  [processTypeEnum.REMIND]: {
    name: '提示',
    color: 'green'
  },
  [processTypeEnum.PLUGIN]: {
    name: '插件',
    color: 'yellow'
  },
  [processTypeEnum.READ]: {
    name: '读取',
    color: 'magentaBright'
  },
  [processTypeEnum.END]: {
    name: '结束',
    color: 'blueBright'
  },
}