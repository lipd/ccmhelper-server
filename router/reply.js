const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Topic = require('../models/topic')
const Reply = require('../models/reply')
const CommentSchema = require('../models/comment-schema')
const Comment = mongoose.model('Comment', CommentSchema)
const requireAuth = require('../middleware/require-auth')
const getUser = require('../middleware/get-user')

router.post('/topics/:topicId/replys', [requireAuth, getUser], (req, res) => {
  const user = req.user
  const topicId = req.params.topicId
  Topic.findById(topicId).exec((err, topic) => {
    if (err) {
      return console.log(err)
    }
    const reply = new Reply(req.body)
    reply.topic = topic
    reply.author = user
    reply.save(err => {
      if (err) {
        return console.log(err)
      }
      topic.replys.push(reply)
      topic.save(err => {
        if (err) {
          return console.log(err)
        }
        res.json({ data: reply, success: true })
      })
    })
  })
})

// get all replys
router.get('/replys', (req, res) => {
  Reply.find().sort({ createdAt: -1 }).exec((err, replys) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ data: replys, success: true })
  })
})

router.get('/replys/:replyId', (req, res) => {
  Reply.findById(req.params.replyId).populate('author').exec((err, reply) => {
    if (err) {
      return console.log(err)
    }
    Comment.populate(reply.comments, { path: 'author' }, (err, comments) => {
      reply.comments = comments
      res.json({ data: reply, success: true })
    })
  })
})

router.post('/replys/:replyId/comments', [requireAuth, getUser], (req, res) => {
  const user = req.user
  const comment = new Comment(req.body)
  comment.author = user
  Reply.findById(req.params.replyId)
    .populate({
      path: 'comments',
      populate: 'author'
    })
    .exec((err, reply) => {
      if (err) {
        console.log(err)
      }
      reply.comments.push(comment)
      reply.save(err => {
        if (err) {
          return console.log(err)
        }
        Comment.populate(
          reply.comments,
          { path: 'author' },
          (err, comments) => {
            res.json({ data: comments, success: true })
          }
        )
      })
    })
})

module.exports = router
