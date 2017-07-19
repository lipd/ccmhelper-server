const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = require('./CommentSchema')

const AnswerSchema = new Schema(
  {
    author: { type: String, required: true},
    avatarUrl: { type: String, require: true },
    content: { type: String, require: true },
    vote: { type: Number, default: 0 },
    question: { type: Number, ref: 'Question' },
    comments: [ CommentSchema ]
  },
  { timestamps: true }
)

exports.Answer = mongoose.model('Answer', AnswerSchema)