const express = require('express')
const router = express.Router()
const axios = require('axios')
const Message = require('../models/Message')
const config = require('../config')

router.post('/login', (req, res) => {
  const queryString = `appid=${config.appId}&secret=${config.appSecret}&js_code=${req.body.code}&grant_type=authorization_code`
  const wxAPI = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
  axios.get(wxAPI)
    .then(response => {
      console.log(response.data)
      res.json({
        message: 'success'
      })
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router