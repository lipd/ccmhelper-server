const express = require('express')
const router = express.Router()
const Message = require('../models/message')

router.get('/messages', (req, res) => {
  Message.find().sort({ createdAt: -1 }).exec((err, messages) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: messages, success: true })
  })
})

router.post('/messages', (req, res, next) => {
  const message = new Message(req.body)
  message.save(err => {
    if (err) {
      next(err)
    }
    Message.find().sort({ createdAt: -1 }).exec((err, messages) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ data: messages, success: true })
    })
  })
})

module.exports = router
