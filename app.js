const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Message = require('./models/Message')
const Question = require('./models/Question')
const Answer = require('./models/Answer')
const CommentSchema = require('./models/CommentSchema')
const Comment = mongoose.model('Comment', CommentSchema)
const bodyParser = require('body-parser')
const cors = require('cors')

// load middleware
// when you use badyParser.json(), the req.body is already json!
app.use(cors())
app.use(bodyParser.json())

// this will create ccmhelper db
const mongoPath = 'mongodb://localhost:27017/ccmhelper'

mongoose.connect(mongoPath)

// ** Check server connected **
// const db = mongoose.connection
// db.on('error', console.log)
// db.once('openUri', () => {
//   console.log('success')
// })

// TODO: validate the request only have
// TODO: send a error message to clint

app.get('/messages', (req, res) => {
  Message.find().sort({'createdAt': -1}).exec((err, messages) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: messages, success: true })
  })
})

app.post('/messages', (req, res) => {
  const message = new Message(req.body)
  message.save((err) => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: message, success: true })
  })
})

app.get('/questions', (req, res) => {
  Question.find().sort({'createdAt': -1}).exec((err, questions) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: questions, success: true })
  })
})

app.post('/questions', (req, res) => {
  const question = new Question(req.body)
  question.save((err) => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: question, success: true })
  })
})

app.get('/answers', (req, res) => {
  Answer.find().sort({'createdAt': -1}).exec((err, answers) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: answers, success: true })
  })
})

app.post('/answers', (req, res) => {
  const answer = new Answer(req.body)
  answer.save((err) => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: answer, success: true })
  })
})

app.listen(3000, () => {
  console.log('running on port 3000')
})

module.exports = app