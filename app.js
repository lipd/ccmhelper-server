const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const question = require('./router/question')
const message = require('./router/message')
// load middleware
// when you use badyParser.json(), the req.body is already json!
app.use(cors())
app.use(bodyParser.json())

// this will create ccmhelper db
const mongoPath = 'mongodb://localhost:27017/ccmhelper'
mongoose.connection.openUri(mongoPath)

// ** Check server connected **
// const db = mongoose.connection
// db.on('error', console.log)
// db.once('openUri', () => {
//   console.log('success')
// })

app.use(message)
app.use(question)

// TODO: validate the request only have
// TODO: send a error message to clint

app.listen(3000, () => {
  console.log('running on port 3000')
})

module.exports = app