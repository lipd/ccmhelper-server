const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = require('./CommentSchema')

const AnswerSchema = new Schema(
  {
    author: { type: String, required: true},
    avatarUrl: { type: String, require: true },
    content: { type: String, require: true },
    vote: { type: Number, default: 0 },
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    comments: [ CommentSchema ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Answer', AnswerSchema)