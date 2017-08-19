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
      const authorities = user.authorities
      const id = user._id
      return res.json({ token, authorities, id })
    } else {
      const userData = {
        openid: openid,
        avatarUrl: req.body.avatarUrl,
        nickName: req.body.nickName
      }
      const user = new User(userData)
      user.openid = openid
      user.save()
      const authorities = user.authorities
      const id = user._id
      return res.json({ token, authorities, id })
    }
  })
})

module.exports = router
