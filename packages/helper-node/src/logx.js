"use strict";
exports.__esModule = true;
var chalk = require('chalk');
var constants_1 = require("./constants/constants");
var Logx = /** @class */ (function () {
    function Logx() {
    }
    /**
     * 开始
     */
    Logx.prototype.start = function (params) {
        logx("start" /* START */, params.title, params.filePath);
    };
    /**
     * 创建
     */
    Logx.prototype.create = function (params) {
        logx("create" /* CREATE */, params.title, params.filePath);
    };
    /**
     * 编译
     */
    Logx.prototype.compile = function (params) {
        logx("compile" /* COMPILE */, params.title, params.filePath);
    };
    /**
     * 转换
     */
    Logx.prototype.convert = function (params) {
        logx("convert" /* CONVERT */, params.title, params.filePath);
    };
    /**
     * 复制
     */
    Logx.prototype.copy = function (params) {
        logx("copy" /* COPY */, params.title, params.filePath);
    };
    /**
     * 复制
     */
    Logx.prototype.generate = function (params) {
        logx("generate" /* GENERATE */, params.title, params.filePath);
    };
    /**
     * 修改
     */
    Logx.prototype.modify = function (params) {
        logx("modify" /* MODIFY */, params.title, params.filePath);
    };
    /**
     * 错误
     */
    Logx.prototype.error = function (params) {
        logx("error" /* ERROR */, params.title, params.filePath);
    };
    /**
     * 警告
     */
    Logx.prototype.warning = function (params) {
        logx("warning" /* WARNING */, params.title, params.filePath);
    };
    /**
     * 提示
     */
    Logx.prototype.remind = function (params) {
        logx("remind" /* REMIND */, params.title, params.filePath);
    };
    /**
     * 删除
     */
    Logx.prototype.unlink = function (params) {
        logx("unlink" /* UNLINK */, params.title, params.filePath);
    };
    /**
     * 引用
     */
    Logx.prototype.reference = function (params) {
        logx("reference" /* REFERENCE */, params.title, params.filePath);
    };
    return Logx;
}());
/**
 * @param type 类型
 * @param logText 需要打印的文字
 * @param filePath 文件路径
 */
var logx = function (type, logText, filePath) {
    var typeShow = constants_1.processTypeMap[type];
    // 如果是字符串颜色，则调用chalk的子方法
    if (typeof typeShow.color === 'string') {
        console.log(chalk[typeShow.color](typeShow.name), '', logText, '', filePath);
    }
    else {
        // 如果是chalk颜色则直接调用color方法
        console.log(typeShow.color(typeShow.name), '', logText, '', filePath);
    }
};
exports["default"] = new Logx();
