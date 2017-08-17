const jwt = require('jsonwebtoken')
const config = require('../config')
const mongoose = require('mongoose')
const Message = require('../models/message')
const Topic = require('../models/topic')
const Reply = require('../models/reply')
const CommentSchema = require('../models/comment-schema')
const Comment = mongoose.model('Comment', CommentSchema)
const User = require('../models/user')

const generateToken = function(user) {
  return jwt.sign(user, config.jwtSecret, {
    expiresIn: 7200
  })
}

const mockTopicData = {
  title: 'Test title',
  content: 'Test content'
}

const mockReplyData = {
  content: 'This is reply content'
}

const mockCommentData = {
  content: 'This is comment content'
}

const mockUserData = {
  openid: '123456',
  avatarUrl:
    '"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaZhT7ooCZXrMdljsHPb7n1Hunb72AGPxseoQsQ6lzsvyPmJia2ULEm7lZFRnFbdXAZBN8slQmQaA/0"',
  nickName: 'zs'
}

const mockMessageData = {
  title: 'Test title',
  department: 'Test deparment',
  content: 'Test content'
}
exports.mockMessageData = mockMessageData

exports.accessToken = generateToken({ openid: mockUserData.openid })

exports.createUser = function(cb) {
  const user = new User(mockUserData)
  user.authorities.isAdmin = true
  user.authorities.canSendMessage = true
  user.save(err => cb(err, user))
}

exports.createMessage = function(cb) {
  const message = new Message(mockMessageData)
  message.save(err => cb(err, message))
}

exports.createTopic = function(user, cb) {
  const topic = new Topic(mockTopicData)
  topic.author = user
  topic.save(err => cb(err, topic))
}

exports.createReplyOfTopic = function(user, topic, cb) {
  const reply = new Reply(mockReplyData)
  reply.author = user
  topic.replys.push(reply)
  topic.save(() => {
    reply.save(err => {
      cb(err, reply)
    })
  })
}

exports.createReplyOfMessage = function(user, message, cb) {
  const reply = new Reply(mockReplyData)
  reply.author = user
  message.replys.push(reply)
  message.save(() => {
    reply.save(err => {
      cb(err, reply)
    })
  })
}

exports.createComment = function(user, reply, cb) {
  const comment = new Comment(mockCommentData)
  comment.author = user
  reply.comments.push(comment)
  reply.save(err => cb(err, comment))
}
