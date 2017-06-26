const markdown = require('markdown').markdown
const { readFile, writeFile } = require('./fs')
const { formatZhihu, formatEmail } = require('./format')

const writeFileAsync = async function(data) {
  const json = markdown.parse(data)

  const zhihuData = formatZhihu(json)
  const emailData = formatEmail(json)

  try {
    await writeFile('build/email.html', (markdown.toHTML(emailData)))
    await writeFile('build/zhihu.html', markdown.toHTML(zhihuData))

    console.log('saved success')
  } catch (err) {
    console.log(err)
  }
}

const readFileAsync = async function() {
  try {
    let result = await readFile('md/weekly.md')

    writeFileAsync(result)
  } catch (err) {
    console.log(err)
  }
}

readFileAsync()
