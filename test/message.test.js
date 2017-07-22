const request = require('supertest')
const should = require('should')
const app = require('../app')

describe('test API of messages', () => {

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

})