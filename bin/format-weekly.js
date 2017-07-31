#!/usr/bin/env node

const path = require('path')
const markdown = require('markdown').markdown
const program = require('commander')
const pkg = require('../package.json')
const { readFile, writeFile } = require('../lib/fs')
const { formatZhihu, formatEmail } = require('../lib/format')

program
  .version(pkg.version)
  .usage('[options] [file.md]')
  .option('-o, --output [out]', '输出目录', 'build')
  .parse(process.argv)

const input = program.args[0] || 'md/weekly.md'
const output = program.output

const writeFileAsync = async function(data) {
  const json = markdown.parse(data)

  const zhihuData = formatZhihu(json)
  const emailData = formatEmail(json)

  try {
    await writeFile(path.resolve(output, 'email.html'), markdown.toHTML(emailData))
    await writeFile(path.resolve(output, 'zhihu.html'), markdown.toHTML(zhihuData))

    console.log('saved success')
  } catch (err) {
    console.log(err)
  }
}

const readFileAsync = async function() {
  try {
    let result = await readFile(input)

    writeFileAsync(result)
  } catch (err) {
    console.log(err)
  }
}

readFileAsync()

