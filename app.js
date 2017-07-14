const express = require('express')
const app = express()
const mongoose = require('mongoose')

const mongoPath = 'mongodb://localhost:27017/ccmhelper'

mongoose.connect(mongoPath)

// ** Check server connected **
// const db = mongoose.connection
// db.on('error', console.log)
// db.once('openUri', () => {
//   console.log("success")
// })

app.get('/messages', (req, res) => {
  res.send('Hello Message')
})

app.listen(3000, () => {
  console.log('running on port 3000')
})