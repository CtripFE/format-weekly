
# 统一邮件格式以及知乎专栏

[![npm version](https://img.shields.io/npm/v/format-weekly.svg?style=flat-square)](https://www.npmjs.com/package/format-weekly)
[![npm downloads](https://img.shields.io/npm/dm/format-weekly.svg?style=flat-square)](https://www.npmjs.com/package/format-weekly)

## 环境要求

项目使用 ES7 语法，建议使用 node8 运行此项目

## 使用方法

### Installation

```sh
npm install format-weekly -g
```

### Execution

```sh
$ format-weekly
// 指定文件
$ format-weekly md/weekly.md
// 制定输出目录
$ format-weekly -o build md/weekly.md
```

### Help

```sh
$ format-weekly -h

Usage: format-weekly [options] [file.md]


Options:

  -V, --version       output the version number
  -o, --output [out]  configure the output directory
  -h, --help          output usage information
```

生成两个文件，一个用于 email，一个用于 zhihu
