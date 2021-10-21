# lerna工作流程

## 初始化lerna工程

1. 初始化

```shell
lerna init
```

2. 添加packages

在 packages 文件夹中添加不同的子包，并分别执行 npm init -y 初始化 package.json 文件。

3. 统一安装依赖

根目录中执行 `lerna bootstrap`，将会为所有的子包安装依赖。

4. 发布包

执行 `lerna publish` 即可发布至npm（需要先提交代码）。

## 参考

- [lerna管理前端packages的最佳实践](http://www.sosout.com/2018/07/21/lerna-repo.html)
- [lerna使用指南](https://www.jianshu.com/p/db3ee301af47)
