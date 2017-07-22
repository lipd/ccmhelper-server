const request = require('supertest')
const should = require('should')
const app = require('../app')

describe('test app', () => {

  describe('test POST /messages', () => {
    it('should create a message', (done) => {
      request(app)
        .post('/messages')
        .send({
          title: "This is test Title",
          author: "This is test Author",
          content: "This is test Content"
        })
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data._id.should.be.String()
          done()
        })
    })
  })

  describe('test GET /messages', () => {

    it('should return messages', (done) => {
      request(app)
        .get('/messages')
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data.length.should.above(0)
          done()
        })
    })
  })

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

})