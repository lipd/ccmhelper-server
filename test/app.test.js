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

  describe('test POST /question', () => {

    it('should create a answer', (done) => {
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

  describe('test GET /question', () => {

    it('should return question', (done) => {
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

  describe('test POST /answers', () => {

    it('should create a answer', (done) => {
      request(app)
        .post('/answers')
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