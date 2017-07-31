const fs = require('fs')

function mkdirSync(url, mode = '0755') {
  const arr = url.split('/')

  // 处理 ./aaa
  if (arr[0] === '.') {
    arr.shift()
  }
  // 处理 ../ddd/d
  if (arr[0] === '..') {
    arr.splice(0, 2, arr[0] + '/' + arr[1])
  }
  // 处理 ./
  if (arr[arr.length - 1] === '') {
    arr.pop()
  }

  function inner(cur) {
    if (!fs.existsSync(cur)) {
      // 不存在就创建一个
      fs.mkdirSync(cur, mode)
    }
    if (arr.length) {
      inner(cur + '/' + arr.shift())
    }
  }
  arr.length && inner(arr.shift())
}

module.exports = mkdirSync
