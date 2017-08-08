// TODO: update token when token expired
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const getOpenid = require('../middlewares/get-openid')
const generateToken = require('../middlewares/generate-token')

router.post('/login', [getOpenid, generateToken], (req, res) => {
  const openid = req.openid
  const token = req.token
  User.findOne({ openid }, (err, user) => {
    if (user) {
      return res.json({ token })
    } else {
      const userData = {
        openid: openid,
        avatarUrl: req.body.avatarUrl,
        nickName: req.body.nickName
      }
      const user = new User(userData)
      user.openid = openid
      user.save()
      return res.json({ token })
    }
  })
})

module.exports = router
