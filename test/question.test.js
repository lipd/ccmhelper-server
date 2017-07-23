const request = require('supertest')
const should = require('should')
const app = require('../app')
const mongoose = require('mongoose')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const CommentSchema = require('../models/CommentSchema')
const Comment = mongoose.model('Comment', CommentSchema)

describe('API of questions', () => {

  let mockQuestion, mockQuestionData
  let mockAnswer, mockAnswerData
  let mockComment, mockCommentData

  before(() => {
    mockQuestionData = {
      author: "This is question author",
      avatarUrl: "test/question/url",
      content: "This is question content"
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

  beforeEach((done) => {
    mockQuestion = new Question(mockQuestionData)
    mockAnswer = new Answer(mockAnswerData)
    mockComment = new Comment(mockCommentData)
    Question.remove({}, (err) => {
      Answer.remove({}, (err) => {
        done()
      })
    })
  })

  describe('GET /questions', () => {

    it('should get all questions', (done) => {
      mockQuestion.save((err) => {
        request(app)
          .get('/questions')
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

  describe('POST /questions', () => {

    it('should post a question', (done) => {
      request(app)
        .post('/questions')
        .send(mockQuestionData)
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data.should.be.Object()
          res.body.data._id.should.be.String()
          done()
        })
    })
  })

  describe('GET /questions/:id', () => {

    it('should get a question with answers', (done) => {
      mockQuestion.save((err) => {
        request(app)
          .get('/questions/' + mockQuestion._id)
          .end((err, res) => {
            should.not.exist(err)
            res.body.success.should.true()
            res.body.data.answers.should.be.Array()
            done()
          })
      })
    })
  })

  describe('POST /questions/:questionId/answers', () => {

    it('should post an answer', (done) => {
      mockQuestion.save((err) => {
        request(app)
          .post('/questions/'+ mockQuestion._id + '/answers')
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

    it('should get all answers', (done) => {
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

    it('should create a comment', (done) => {
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

    it('should get a answer by id', (done) => {
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