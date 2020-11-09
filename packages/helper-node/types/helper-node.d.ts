export = helper_node;

type LogxFunc = (...strArr: string[]) => void

declare const helper_node: {
  Logx: {
    start: LogxFunc
    create: LogxFunc
    compile: LogxFunc
    convert: LogxFunc
    copy: LogxFunc
    generate: LogxFunc
    modify: LogxFunc
    error: LogxFunc
    warning: LogxFunc
    remind: LogxFunc
    unlink: LogxFunc
    reference: LogxFunc
  }
}