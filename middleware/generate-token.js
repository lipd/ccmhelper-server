const jwt = require('jsonwebtoken')
const config = require('../config')

const generateToken = function(user) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: 7200
  })
}

module.exports = function(req, res, next) {
  req.token = generateToken({
    openid: req.openid
  })
  next()
}
