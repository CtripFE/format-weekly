#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const program = require('commander')
const markdown = require('markdown').markdown
const inquirer = require('inquirer')
const _ = require('lodash')
const moment = require('moment')
const { readFile, writeFile } = require('../lib/fs')
const { formatBlog } = require('../lib/format')
const mkdirsync = require('../lib/mkdir')

program
  .option('-i, --input [in]', 'configure the input file', 'md/weekly.md')
  .option('-o, --output [out]', 'configure the output directory', '../CtripFE.github.io/_posts/')
  .parse(process.argv)

const input = program.input
const output = program.output

const question = [
  {
    type: 'input',
    name: 'title',
    message: '请输入文章标题?',
    default: () => {
      const result = fs.readFileSync(input, 'utf8')
      const json = markdown.parse(result)
      return getTitle(json)
    }
  },
  {
    type: 'input',
    name: 'date',
    message: '请填写文章日期?',
    default: moment(Date.now()).format('YYYY-MM-DD HH:mm:ww'),
    filter(val) {
      let dateStamp = ''

      const result = moment(val).format('YYYY-MM-DD HH:mm:ww')
      if (result !== 'Invalid date') {
        dateStamp = result
      } else {
        dateStamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ww')
      }

      return dateStamp
    }
  },
  {
    type: 'list',
    name: 'author',
    message: '请选择文章作者?',
    choices: ['mirreal', 'CurtisCBS', 'stoneyong', 'StevenX911', 'Jade05']
  },
  {
    type: 'list',
    name: 'categories',
    message: '请选择文章分类?',
    choices: ['Weekly', 'Translator', 'Team'],
    default: 'Weekly'
  }
]

inquirer.prompt(question).then(answers => {
  readFileAsync(answers)
})

const writeFileAsync = async function(data, answers) {
  const blogData = formatBlog(data, answers)

  try {
    mkdirsync(output)

    const fileName = `${moment(answers.date).format('YYYY-MM-DD')}-weekly.md`
    await writeFile(path.resolve(output, fileName), blogData)

    console.log('saved success')
  } catch (err) {
    console.log(err)
  }
}

const readFileAsync = async function(answers) {
  try {
    let result = await readFile(input)

    writeFileAsync(result, answers)
  } catch (err) {
    console.log(err)
  }
}

function getTitle(data) {
  for (let i = 0, len = data.length; i < len; i++) {
    const item = data[i]

    if (_.isArray(item)) {
      if (item[0] === 'header' && item[1].level === 1) {
        return item[2]
      }
    }
  }
}
