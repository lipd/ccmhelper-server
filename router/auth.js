const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config')
const getOpenid = require('../middleware/get-openid')


const generateToken = function(user) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: 7200
  })
}

router.post('/login', getOpenid, (req, res) => {
  const openid = req.openid
  User.findOne({ openid }, (err, user) => {
    if (user) {
      return res.json({
        token: generateToken({ openid })
      })
    } else {
      const userData = {
        openid: openid,
        avatarUrl: req.body.avatarUrl,
        nickName: req.body.nickName
      }
      const user = new User(userData)
      user.openid = openid
      user.save()
      return res.json({
        token: generateToken({ openid })
      })
    }
  })
})

module.exports = router
