const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = require('./comment-schema')

const ReplySchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, require: true },
    vote: { type: Number, default: 0 },
    comments: [CommentSchema]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Reply', ReplySchema)
