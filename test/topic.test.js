const request = require('supertest')
const should = require('should')
const app = require('../app')
const mongoose = require('mongoose')
const Topic = require('../models/topic')
const Reply = require('../models/reply')
const CommentSchema = require('../models/comment-schema')
const Comment = mongoose.model('Comment', CommentSchema)

describe('API of topics', () => {

  let mockTopic, mockTopicData
  let mockReply, mockReplyData
  let mockComment, mockCommentData

  before(() => {
    mockTopicData = {
      author: "This is topic author",
      avatarUrl: "test/topic/url",
      content: "This is topic content"
    }

    mockReplyData = {
      author: "This is reply author",
      avatarUrl: "test/reply/url",
      content: "This is reply content"
    }

    mockCommentData = {
      author: "This is comment author",
      avatarUrl: "test/comment/url",
      content: "This is comment content"
    }
  })

  beforeEach(done => {
    mockTopic = new Topic(mockTopicData)
    mockReply = new Reply(mockReplyData)
    mockComment = new Comment(mockCommentData)
    Topic.remove({}, (err) => {
      Reply.remove({}, (err) => {
        done()
      })
    })
  })

  describe('GET /topics', () => {

    it('should get all topics', done => {
      mockTopic.save((err) => {
        request(app)
          .get('/topics')
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

  describe('POST /topics', () => {

    it('should post a topic', done => {
      request(app)
        .post('/topics')
        .send(mockTopicData)
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data.should.be.Object()
          res.body.data._id.should.be.String()
          done()
        })
    })
  })

  describe('GET /topics/:id', () => {

    it('should get a topic with replys', done => {
      mockTopic.save((err) => {
        request(app)
          .get('/topics/' + mockTopic._id)
          .end((err, res) => {
            should.not.exist(err)
            res.body.success.should.true()
            res.body.data.replys.should.be.Array()
            done()
          })
      })
    })
  })

  describe('POST /topics/:topicId/replys', () => {

    it('should post an reply', done => {
      mockTopic.save((err) => {
        request(app)
          .post('/topics/'+ mockTopic._id + '/replys')
          .send(mockReplyData)
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

  describe('POST /replys/:replyId/comments', () => {

    it('should create a comment', done => {
      mockReply.save((err) => {
        request(app)
          .post('/replys/' + mockReply._id + '/comments')
          .send(mockCommentData)
          .end((err, res) => {
            should.not.exist(err)
            res.body.data.should.be.Object()
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

})