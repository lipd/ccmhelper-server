const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Topic = require('../models/topic')
const Message = require('../models/message')
const Reply = require('../models/reply')
const CommentSchema = require('../models/comment-schema')
const Comment = mongoose.model('Comment', CommentSchema)
const requireAuth = require('../middlewares/require-auth')
const getUser = require('../middlewares/get-user')

router.post('/topics/:topicId/replys', [requireAuth, getUser], (req, res, next) => {
  const user = req.user
  const topicId = req.params.topicId
  Topic.findById(topicId).exec((err, topic) => {
    if (err) {
      next(err)
    }
    const reply = new Reply(req.body)
    reply.author = user
    reply.save(err => {
      if (err) {
        next(err)
      }
      topic.replys.push(reply)
      topic.save(err => {
        if (err) {
          next(err)
        }
        res.json({ data: reply, success: true })
      })
    })
  })
})

router.post('/messages/:messageId/replys', [requireAuth, getUser], (req, res, next) => {
  const user = req.user
  const messageId = req.params.messageId
  Message.findById(messageId).exec((err, message) => {
    if (err) {
      next(err)
    }
    const reply = new Reply(req.body)
    reply.author = user
    reply.save(err => {
      if (err) {
        next(err)
      }
      message.replys.push(reply)
      message.save(err => {
        if (err) {
          next(err)
        }
        res.json({reply})
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

router.get('/replys/:replyId', (req, res, next) => {
  Reply.findById(req.params.replyId).populate('author').exec((err, reply) => {
    if (err) {
      next(err)
    }
    Comment.populate(reply.comments, { path: 'author' }, (err, comments) => {
      reply.comments = comments
      res.json({ data: reply, success: true })
    })
  })
})

router.post('/replys/:replyId/comments', [requireAuth, getUser], (req, res, next) => {
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
        next(err)
      }
      reply.comments.push(comment)
      reply.save(err => {
        if (err) {
          next(err)
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

// TODO: Do Test
router.put('/replys/:id/upvote',[requireAuth, getUser], (req, res, next) => {
  const id = req.params.id
  const user = req.user
  Reply.findById(id).exec((err, reply) => {
    if (err) {
      next(err)
    }
    reply.votes.addToSet(user)
    reply.save(err => {
      if (err) {
        next(err)
      }
      res.json({ voted: true })
    })
  })
})

router.put('/replys/:id/downvote', [requireAuth, getUser], (req, res, next) => {
  const id = req.params.id
  const user = req.user
  Reply.findById(id).exec((err, reply) => {
    if (err) {
      next(err)
    }
    reply.votes.pull(user)
    reply.save(err => {
      if (err) {
        next(err)
      }
      res.json({ downVoted: true })
    })
  })
})

module.exports = router
