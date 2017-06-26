const _ = require('lodash')

function formatZhihu(data) {
  let zhihuData = data.map(item => {
    if (_.isArray(item) && item[0] === 'header' && item[1].level === 4) {
      return item[2]
    }

    return item
  })

  return zhihuData
}

function formatEmail(data) {
  let emailData = data.map(item => {
    if (_.isArray(item)) {
      if (item[0] === 'header' && item[1].level === 1) {
        item[1].style =
          'padding:10 5px;line-height:36px;font-size:23px;background-color:#f7df1e;font-weight:bold;color:#323330'
      }

      if (item[0] === 'header' && item[1].level === 2) {
        item[1].style = 'font-size:20px;color:#4e4e4e'
      }

      // 链接样式
      if (item[0] === 'header' && item[1].level === 4) {
        item[2][1].style =
          'display:block;font-size:18px;color:#0081b5;line-height:24px;text-decoration:underline;font-weight:normal'
      }

      if (item[0] === 'para') {
        item[2] = item[1]
        item[1] = {
          style: 'font-size:14px;line-height:19px;margin-top:0px;margin-bottom:3px'
        }
      }

      if (item[0] === 'blockquote') {
        item.splice(1, 0, {
          style: 'font-size:14px;line-height:19px;margin-top:0px;margin-bottom:3px'
        })
      }
    }

    return item
  })

  return emailData
}

module.exports = {
  formatZhihu,
  formatEmail
}
