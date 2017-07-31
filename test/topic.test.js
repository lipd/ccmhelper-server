const request = require('supertest')
const should = require('should')
const app = require('../app')
const support = require('./support')

describe('API of topics', () => {

  let mockUser, mockTopic

  before(done => {
    support.createUser((err, user) => {
      mockUser = user
      support.createTopic(user, (err, topic) => {
        mockTopic = topic
        done()
      })
    })
  })

  describe('GET /topics', () => {

    it('should get all topics', done => {
      mockUser.save(() => {
        mockTopic.author = mockUser
        mockTopic.save(() => {
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
  })

  describe('POST /topics', () => {

    it('should post a topic', done => {
      request(app)
        .post('/topics')
        .set('Authorization', support.accessToken)
        .send({
          title: 'Test title',
          content: 'Test content'
        })
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
      mockUser.save(() => {
        mockTopic.author = mockUser
        mockTopic.save(() => {
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
  })

})