const fs = require('fs')

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', error => {
      if (error) {
        reject(error)
      } else {
        resolve('success')
      }
    })
  })
}

module.exports = {
  readFile,
  writeFile
}
