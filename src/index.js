const markdown = require('markdown').markdown
const { readFile, writeFile } = require('./fs')

console.log(markdown)

const writeFileAsync = async function(data) {
  const json = JSON.stringify(markdown.parse(data))
  const html = markdown.toHTML(data)

  try {
    await writeFile('build/test.html', html)
    await writeFile('build/test.json', json)

    console.log('saved success')
  } catch (err) {
    console.log(err)
  }
}

const readFileAsync = async function() {
  try {
    let result = await readFile('md/test.md')

    writeFileAsync(result)
  } catch (err) {
    console.log(err)
  }
}

readFileAsync()
