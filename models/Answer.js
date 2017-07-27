const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = require('./comment-schema')

const AnswerSchema = new Schema(
  {
    author: { type: String, required: true},
    avatarUrl: { type: String, require: true },
    content: { type: String, require: true },
    vote: { type: Number, default: 0 },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    comments: [ CommentSchema ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Answer', AnswerSchema)