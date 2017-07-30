const express = require('express')
const router = express.Router()
const mongoose =require('mongoose')
const moment = require('moment')
const Topic = require('../models/topic')
const Answer = require('../models/answer')
const CommentSchema = require('../models/comment-schema')
const Comment = mongoose.model('Comment', CommentSchema)
const requireAuth = require('../middleware/require-auth')
const getUser = require('../middleware/get-user')

router.get('/topics', (req, res) => {
  Topic
    .find()
    .populate('author', 'avatarUrl nickName')
    .sort({'createdAt': -1})
    .exec((err, topics) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      const topicsData = topics.map(topic => ({
        _id: topic._id,
        time: moment(topic.createdAt).fromNow(),
        author: topic.author.nickName,
        avatarUrl: topic.author.avatarUrl,
        content: topic.content,
        title: topic.title,
        attentionCount: topic.attentionCount,
        replyCount: topic.answers.length
      }))
      res.json({ data: topicsData, success: true })
    })
})

router.post('/topics', [requireAuth, getUser], (req, res) => {
  const user = req.user
  const topic = new Topic(req.body)
  topic.author = user
  topic.save((err) => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: topic, success: true })
  })
})

// get topic and the answers of it
router.get('/topics/:id', (req, res) => {
  Topic
    .findById(req.params.id)
    .populate('answers')
    .exec((err, topic) => {
      if (err) {
        return console.log(err)
      }
      res.json({ data: topic, success: true })
    })
})

router.post('/topics/:topicId/answers', (req, res) => {
  const topicId = req.params.topicId
  Topic
    .findById(topicId)
    .exec((err, topic) => {
      if (err) {
        return console.log(err)
      }
      const answer = new Answer(req.body)
      answer.topic = topic
      answer.save(err => {
        if (err) {
          return console.log(err)
        }
        topic.answers.push(answer)
        topic.save(err => {
          if (err) {
            return console.log(err)
          }
          topic.populate('answers', (err, populatedTopic) => {
            res.json({ data: populatedTopic, success: true })
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
      answer.save(err => {
        if (err) {
          return console.log(err)
        }
        res.json({ data: answer, success: true })
      })
    })
})

module.exports = router