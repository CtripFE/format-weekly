const _ = require('lodash')

var STYLE  = {
  "ZHIHU_HEADER_1"   : 'font-weight:bold;',
  "EMAIL_HEADER_1"   : 'padding:10 5px;line-height:36px;font-size:23px;background-color:#f7df1e;font-weight:bold;color:#323330',
  "EMAIL_HEADER_2"   : 'font-size:20px;color:#4e4e4e',
  "EMAIL_LINK"       : 'display:block;font-size:18px;color:#0081b5;line-height:24px;text-decoration:underline;font-weight:normal',
  "EMAIL_PARAGRAPH"  : 'font-size:14px;line-height:19px;margin-top:0px;margin-bottom:3px',
  "EMAIL_BLOCKQUOTE" : 'font-size:14px;line-height:19px;margin-top:0px;margin-bottom:3px'
};
function formatZhihu(data) {
  let zhihuData = data.map(item => {
    if (_.isArray(item) && item[0] === 'header') {
      if(item[1].level === 4){
        return item[2]
      }
      else if(item[1].level === 1){
        item[1].style = STYLE['ZHIHU_HEADER_1']
        return item;
      }
    }

    return item
  })

  return zhihuData
}

function formatEmail(data) {
  const mdData = _.cloneDeep(data)

  let emailData = mdData.map(item => {
    if (_.isArray(item)) {
      if (item[0] === 'header' && item[1].level === 1) {
        item[1].style = STYLE['EMAIL_HEADER_1'];
      }

      if (item[0] === 'header' && item[1].level === 2) {
        item[1].style = STYLE['EMAIL_HEADER_2'];
      }

      // link style
      if (item[0] === 'header' && item[1].level === 4) {
        item[2][1].style = STYLE['EMAIL_LINK']
      }

      if (item[0] === 'para') {
        item[2] = item[1]
        item[1] = {
          style: STYLE['EMAIL_PARAGRAPH']
        }
      }

      if (item[0] === 'blockquote') {
        item.splice(1, 0, {
          style: STYLE['EMAIL_BLOCKQUOTE']
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
