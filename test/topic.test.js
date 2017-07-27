const request = require('supertest')
const should = require('should')
const app = require('../app')
const mongoose = require('mongoose')
const Topic = require('../models/topic')
const Answer = require('../models/answer')
const CommentSchema = require('../models/comment-schema')
const Comment = mongoose.model('Comment', CommentSchema)

describe('API of topics', () => {

  let mockTopic, mockTopicData
  let mockAnswer, mockAnswerData
  let mockComment, mockCommentData

  before(() => {
    mockTopicData = {
      author: "This is topic author",
      avatarUrl: "test/topic/url",
      content: "This is topic content"
    }

    mockAnswerData = {
      author: "This is answer author",
      avatarUrl: "test/answer/url",
      content: "This is answer content"
    }

    mockCommentData = {
      author: "This is comment author",
      avatarUrl: "test/comment/url",
      content: "This is comment content"
    }
  })

  beforeEach(done => {
    mockTopic = new Topic(mockTopicData)
    mockAnswer = new Answer(mockAnswerData)
    mockComment = new Comment(mockCommentData)
    Topic.remove({}, (err) => {
      Answer.remove({}, (err) => {
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

    it('should get a topic with answers', done => {
      mockTopic.save((err) => {
        request(app)
          .get('/topics/' + mockTopic._id)
          .end((err, res) => {
            should.not.exist(err)
            res.body.success.should.true()
            res.body.data.answers.should.be.Array()
            done()
          })
      })
    })
  })

  describe('POST /topics/:topicId/answers', () => {

    it('should post an answer', done => {
      mockTopic.save((err) => {
        request(app)
          .post('/topics/'+ mockTopic._id + '/answers')
          .send(mockAnswerData)
          .end((err, res) => {
            should.not.exist(err)
            res.body.success.should.true()
            res.body.data.answers.length.should.above(0)
            res.body.data.answers[0].should.be.Object()
            done()
          })
      })
    })
  })

  describe('GET /answers', () => {

    it('should get all answers', done => {
      mockAnswer.save((err) => {
        request(app)
          .get('/answers')
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

  describe('POST /answers/:answerId/comments', () => {

    it('should create a comment', done => {
      mockAnswer.save((err) => {
        request(app)
          .post('/answers/' + mockAnswer._id + '/comments')
          .send(mockCommentData)
          .end((err, res) => {
            should.not.exist(err)
            res.body.data.should.be.Object()
            done()
          })
      })
    })
  })

  describe('GET /answers/:answerId', () => {

    it('should get a answer by id', done => {
      mockAnswer.comments.push(mockComment)
      mockAnswer.save((err) => {
        request(app)
          .get('/answers/' + mockAnswer._id)
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