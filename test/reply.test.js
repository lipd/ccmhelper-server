const request = require('supertest')
const should = require('should')
const app = require('../app')
const mongoose = require('mongoose')
const CommentSchema = require('../models/comment-schema')
const Comment = mongoose.model('Comment', CommentSchema)
const Topic = require('../models/topic')
const Reply = require('../models/reply')
const User = require('../models/user')
const support = require('./support')

describe('API of replys', () => {

  let mockUser, mockTopic, mockReply, mockComment

  before(done => {
    support.createUser((err, user) => {
      mockUser = user
      support.createTopic(user, (err, topic) => {
        mockTopic = topic
        support.createReply(user, topic, (err, reply) => {
          mockReply = reply
          support.createComment(user, reply, (err, comment) => {
            mockComment = comment
            done()
          })
        })
      })
    })
  })

  describe('POST /topics/:topicId/replys', () => {

    it('should post an reply', done => {
      mockTopic.save((err) => {
        request(app)
          .post('/topics/'+ mockTopic._id + '/replys')
          .set('Authorization', support.accessToken)
          .send({ content: 'Test content' })
          .end((err, res) => {
            should.not.exist(err)
            res.body.success.should.true()
            res.body.data.replys.length.should.above(0)
            res.body.data.replys[0].should.be.Object()
            done()
          })
      })
    })
  })

  describe('GET /replys', () => {

    it('should get all replys', done => {
      mockReply.save((err) => {
        request(app)
          .get('/replys')
          .end((err, res) => {
            should.not.exist(err)
            res.body.success.should.true()
            res.body.data.should.be.Array()
            res.body.data.length.should.above(0)
            done()
          })
      })
    })
  })

  describe('GET /replys/:replyId', () => {

    it('should get a reply by id', done => {
      mockReply.comments.push(mockComment)
      mockReply.save((err) => {
        request(app)
          .get('/replys/' + mockReply._id)
          .end((err, res) => {
            should.not.exist(err)
            res.body.success.should.true()
            res.body.data.comments[0].should.be.Object()
            done()
          })
      })
    })
  })

  describe('POST /replys/:replyId/comments', () => {

    it('should create a comment', done => {
      mockReply.save((err) => {
        request(app)
          .post('/replys/' + mockReply._id + '/comments')
          .set('Authorization', support.accessToken)
          .send({ content: 'Test content' })
          .end((err, res) => {
            should.not.exist(err)
            res.body.data.should.be.Object()
            done()
          })
      })
    })
  })
})