const request = require('supertest')
const should = require('should')
const app = require('../app')
const support = require('./support')

describe('test API of messages', () => {
  let mockMessage

  before(done => {

    support.createUser((err, user) => {
      support.createMessage((err, message) => {
        mockMessage = message
        support.createReplyOfMessage(user, message, () => {
          done()
        })
      })
    })
  })

  describe('GET /messages', () => {
    it('should get all messages', done => {
      mockMessage.save(() => {
        request(app).get('/messages').end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data.length.should.above(0)
          done()
        })
      })
    })
  })

  describe('POST /messages', () => {
    it('should create a message', done => {
      request(app)
        .post('/messages')
        .set('Authorization', support.accessToken)
        .send(support.mockMessageData)
        .end((err, res) => {
          should.not.exist(err)
          res.body.success.should.true()
          res.body.data.length.should.above(0)
          done()
        })
    })
  })

  describe('POST /messages/:messageId/replys', () => {
    it('should return a reply', done => {
      request(app)
        .post(`/messages/${mockMessage._id}/replys`)
        .set('Authorization', support.accessToken)
        .send({ content: 'Test content'})
        .end((err, res) => {
          should.not.exist(err)
          res.body.reply.content.should.be.String()
          res.body.reply.comments.should.be.Array()
          done()
        })
    })
  })
})
