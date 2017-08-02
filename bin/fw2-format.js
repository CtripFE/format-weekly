#!/usr/bin/env node

const path = require('path')
const markdown = require('markdown').markdown
const program = require('commander')
const { readFile, writeFile } = require('../lib/fs')
const { formatZhihu, formatEmail } = require('../lib/format')
const mkdirsync = require('../lib/mkdir')

program
  .option('-i, --input [in]', 'configure the input file', 'md/weekly.md')
  .option('-o, --output [out]', 'configure the output directory', 'build')
  .parse(process.argv)

const input = program.input
const output = program.output

const writeFileAsync = async function(data) {
  const json = markdown.parse(data)

  const zhihuData = formatZhihu(json)
  const emailData = formatEmail(json)

  try {
    mkdirsync(output)

    await writeFile(path.resolve(output, 'email.html'), markdown.toHTML(emailData))
    await writeFile(path.resolve(output, 'zhihu.html'), markdown.toHTML(zhihuData))

    console.log('formated success')
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
