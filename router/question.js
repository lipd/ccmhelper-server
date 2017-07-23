const express = require('express')
const router = express.Router()
const mongoose =require('mongoose')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const CommentSchema = require('../models/CommentSchema')
const Comment = mongoose.model('Comment', CommentSchema)

router.get('/questions', (req, res) => {
  Question.find().sort({'createdAt': -1}).exec((err, questions) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: questions, success: true })
  })
})

router.post('/questions', (req, res) => {
  const question = new Question(req.body)
  question.save((err) => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: question, success: true })
  })
})

// get question and answer of it
router.get('/questions/:id', (req, res) => {
  Question
    .findById(req.params.id)
    .populate('answers')
    .exec((err, question) => {
      if (err) {
        return console.log(err)
      }
      res.json({ data: question, success: true })
    })
})

router.post('/questions/:questionId/answers', (req, res) => {
  const questionId = req.params.questionId
  Question
    .findById(questionId)
    .exec((err, question) => {
      if (err) {
        return console.log(err)
      }
      const answer = new Answer(req.body)
      answer.question = question
      answer.save((err) => {
        if (err) {
          return console.log(err)
        }
        question.answers.push(answer)
        question.save((err) => {
          if (err) {
            return console.log(err)
          }
          question.populate('answers', (err, populatedQuestion) => {
            res.json({ data: populatedQuestion, success: true })
          })
        })
      })
    })
})

// get all answers
router.get('/answers', (req, res) => {
  Answer.find().sort({'createdAt': -1}).exec((err, answers) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: answers, success: true })
  })
})

router.get('/answers/:answerId', (req, res) => {
  Answer.findById(req.params.answerId).exec((err, answer) => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: answer, success: true })
  })
})

router.post('/answers/:answerId/comments', (req, res) => {
  Answer
    .findById(req.params.answerId)
    .exec((err, answer) => {
      if (err) {
        console.log(err)
      }
      answer.comments.push(req.body)
      answer.save((err) => {
        if (err) {
          return console.log(err)
        }
        res.json({ data: answer, success: true })
      })
    })
})

module.exports = router