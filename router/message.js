const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

router.get('/messages', (req, res) => {
  Message.find().sort({'createdAt': -1}).exec((err, messages) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: messages, success: true })
  })
})

router.post('/messages', (req, res) => {
  const message = new Message(req.body)
  message.save((err) => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: message, success: true })
  })
})

module.exports = router