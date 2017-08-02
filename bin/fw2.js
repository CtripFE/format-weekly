#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')


program
  .version(pkg.version)
  .description('format ELSE weekly for email and zhihu')
  .command('format', 'format').alias('f')
  .command('blog', 'generate blog markdown').alias('b')

program.parse(process.argv)
