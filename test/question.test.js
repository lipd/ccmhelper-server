const request = require('supertest')
const should = require('should')
const app = require('../app')

describe('test API of questions', () => {

  describe('test POST /questions', () => {

    it('should create a question', (done) => {
      request(app)
        .post('/questions')
        .send({
          author: "This is test author",
          avatarUrl: "www.test.url.com",
          content: "This is test content"
        })
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data._id.should.be.String()
          done()
        })
    })
  })

  describe('test GET /questions', () => {

    it('should return questions', (done) => {
      request(app)
        .get('/questions')
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data.length.should.above(0)
          done()
        })
    })
  })

  describe('test GET /questions/:id', () => {

    it('should return a question with answers', (done) => {
      request(app)
        .get('/questions/5971afa34e3ee35e66f74baa')
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          done()
        })
    })
  })

  describe('test POST /questions/:questionId/answers', () => {

    it('should create a answer', (done) => {
      request(app)
        .post('/questions/5971afa34e3ee35e66f74baa/answers')
        .send({
          author: "This is test author",
          avatarUrl: "www.test.url.com",
          content: "This is test content"
        })
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data._id.should.be.String()
          res.body.data.answers.length.should.above(0)
          done()
        })
    })
  })

  describe('test GET /answers', () => {

    it('should return answers', (done) => {
      request(app)
        .get('/answers')
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data.length.should.above(0)
          done()
        })
    })
  })

  describe('test POST /answers/:answerId/comments', () => {

    it('should return answers', (done) => {
      request(app)
        .post('/answers/5972f6b5d393f5005ef291fb/comments')
        .send({
          author: "This is test author",
          avatarUrl: "www.test.url.com",
          content: "This is test content"
        })
        .end((err, res) => {
          should.not.exist(err)
          done()
        })
    })
  })

  describe('test GET /answers/:answerId', () => {

    it('should return a answer', (done) => {
      request(app)
        .get('/answers/5972f6b5d393f5005ef291fb')
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data._id.should.be.String()
          done()
        })
    })
  })

})