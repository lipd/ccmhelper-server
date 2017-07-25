const express = require('express')
const router = express.Router()
const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config')

const generateToken = function (user) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: 7200
  })
}

router.post('/login', (req, res) => {
  const queryString = `appid=${config.appId}&secret=${config.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`
  const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
  axios.get(wxAPI)
    .then(wxRes => {
      User.findOne({openId: wxRes.data.openid}, (err, user) => {
        if (user) {
          // TODO: check user's avatar everytime
          return res.json({
            token: generateToken({openId: wxRes.data.openid})
          })
        } else {
          const userData = {
            openId: wxRes.data.openid,
            avatarUrl: req.body.avatarUrl
          }
          const user = new User(userData)
          user.openId = wxRes.data.openid
          user.save()
          return res.json({
            token: generateToken({openId: wxRes.data.openid}),
          })
        }
      })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router