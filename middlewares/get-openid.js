const axios = require('axios')
const config = require('../config')

module.exports = function(req, res, next) {
  const queryString = `appid=${config.appId}&secret=${config.appSecret}&js_code=${req
    .body.code}&grant_type=authorization_code`
  const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
  axios
    .get(wxAPI)
    .then(wxRes => {
      req.openid = wxRes.data.openid
      next()
    })
    .catch(err => {
      next(err)
    })
}
