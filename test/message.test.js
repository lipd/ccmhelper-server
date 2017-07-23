const request = require('supertest')
const should = require('should')
const app = require('../app')
const Message = require('../models/Message')


describe('test API of messages', () => {

  let mockMessage, mockMessageData

  before(() => {
    mockMessageData = {
      title: "Test title",
      author: "Test author",
      content: "Test content"
    }
    mockMessage = new Message(mockMessageData)
  })

  beforeEach((done) => {
    Message.remove({}, (err) => {
      done()
    })
  })

  describe('GET /messages', () => {

    it('should get all messages', (done) => {
      mockMessage.save()
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

  describe('POST /messages', () => {

    it('should create a message', (done) => {
      request(app)
        .post('/messages')
        .send(mockMessageData)
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data._id.should.be.String()
          done()
        })
    })
  })

})