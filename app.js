const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Message = require('./models/Message')

// this will create ccmhelper db
const mongoPath = 'mongodb://localhost:27017/ccmhelper'

mongoose.connect(mongoPath)

// ** Check server connected **
// const db = mongoose.connection
// db.on('error', console.log)
// db.once('openUri', () => {
//   console.log('success')
// })

// ** Test Message Schema **
// const db = mongoose.connection
// db.on('error', console.log)
// db.once('open', () => {
//   let message = new Message({
//     title: '这是标题',
//     author: '这是作者',
//     content: '这是内容'
//   })
//   message.save((err) => {
//     if (err) console.log(err)
//   })
//   console.log('success')
// })

app.get('/messages', (req, res) => {
  Message.find().sort({'createdAt': -1}).exec((err, messages) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ messages })
  })
})

app.listen(3000, () => {
  console.log('running on port 3000')
})