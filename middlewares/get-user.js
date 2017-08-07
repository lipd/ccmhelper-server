const User = require('../models/user')

module.exports = function(req, res, next) {
  User.findOne({ openid: req.openid }).exec((err, user) => {
    if (err) {
      next(err)
    }
    req.user = user
    next()
  })
}
