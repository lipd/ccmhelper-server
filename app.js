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
  res.send('Hello Message')
})

app.listen(3000, () => {
  console.log('running on port 3000')
})