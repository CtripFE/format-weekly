
# 统一邮件格式以及知乎专栏

[![npm version](https://img.shields.io/npm/v/fw2.svg?style=flat-square)](https://www.npmjs.com/package/fw2)
[![npm downloads](https://img.shields.io/npm/dm/fw2.svg?style=flat-square)](https://www.npmjs.com/package/fw2)

## 环境要求

项目使用 ES7 语法，建议使用 node8 运行此项目

## 使用方法

### Installation

```sh
npm install fw2 -g
```

### Execution

```sh
$ fw2
// 格式化 email 和 zhihu
$ fw2 format
// 指定格式化文件
$ fw2 format -i md/weekly.md
// 指定格式化后输出目录
$ fw2 f -o build
// 生成 Jekyll 文档
$ fw2 blog
// 指定生成 Jekyll 文档的原文件
$ fw2 b -i md/weekly.md
```

### Help

```sh
Usage: fw2 [options] [command]

format ELSE weekly for email and zhihu


Options:

  -V, --version  output the version number
  -h, --help     output usage information
  -i, --input [in]    configure the input file
  -o, --output [out]  configure the output directory


Commands:

  format|f    format
  blog|b      generate blog markdown
  help [cmd]  display help for [cmd]
```

生成两个文件，一个用于 email，一个用于 zhihu
