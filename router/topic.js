const express = require('express')
const router = express.Router()
const mongoose =require('mongoose')
const moment = require('moment')
const Topic = require('../models/topic')
const Reply = require('../models/reply')
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
        replyCount: topic.replys.length
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

// get topic and the replys of it
router.get('/topics/:id', (req, res) => {
  Topic
    .findById(req.params.id)
    .populate('replys')
    .exec((err, topic) => {
      if (err) {
        return console.log(err)
      }
      res.json({ data: topic, success: true })
    })
})

router.post('/topics/:topicId/replys', (req, res) => {
  const topicId = req.params.topicId
  Topic
    .findById(topicId)
    .exec((err, topic) => {
      if (err) {
        return console.log(err)
      }
      const reply = new Reply(req.body)
      reply.topic = topic
      reply.save(err => {
        if (err) {
          return console.log(err)
        }
        topic.replys.push(reply)
        topic.save(err => {
          if (err) {
            return console.log(err)
          }
          topic.populate('replys', (err, populatedTopic) => {
            res.json({ data: populatedTopic, success: true })
          })
        })
      })
    })
})

// get all replys
router.get('/replys', (req, res) => {
  Reply.find().sort({'createdAt': -1}).exec((err, replys) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: replys, success: true })
  })
})

router.get('/replys/:replyId', (req, res) => {
  Reply.findById(req.params.replyId).exec((err, reply) => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: reply, success: true })
  })
})

router.post('/replys/:replyId/comments', (req, res) => {
  Reply
    .findById(req.params.replyId)
    .exec((err, reply) => {
      if (err) {
        console.log(err)
      }
      reply.comments.push(req.body)
      reply.save(err => {
        if (err) {
          return console.log(err)
        }
        res.json({ data: reply, success: true })
      })
    })
})

module.exports = router