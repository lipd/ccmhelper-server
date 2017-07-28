const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function (req, res, next) {
  let token = req.headers.authorization;
  if(token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if(err) {
        if(err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token Expired' });
        } else {
          return res.status(401).json({ error: 'Authentication Filure'});
        }
      } else {
        if(decoded.openid) {
          req.openid = decoded.openid;
          next();
        } else {
          res.status(401).json({ error: 'Authentication Filure'});
        }
      }
    });
  } else {
    return res.status(403).json({
      error: 'No Token'
    });
  }
}