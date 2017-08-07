const express = require('express')
const router = express.Router()
const moment = require('moment')
const Topic = require('../models/topic')
const requireAuth = require('../middlewares/require-auth')
const getUser = require('../middlewares/get-user')

router.get('/topics', (req, res) => {
  Topic.find()
    .populate('author', 'avatarUrl nickName')
    .sort({ createdAt: -1 })
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
  topic.save(err => {
    if (err) {
      return console.log(err)
    }
    res.json({ data: topic, success: true })
  })
})

// get topic and the replys of it
router.get('/topics/:id', (req, res) => {
  Topic.findById(req.params.id)
    .populate({
      path: 'replys',
      populate: { path: 'author' }
    })
    .exec((err, topic) => {
      if (err) {
        return console.log(err)
      }
      res.json({ data: topic, success: true })
    })
})

module.exports = router
