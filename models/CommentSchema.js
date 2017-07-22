const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    author: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    content: { type: String, required: true }
  }
)

module.exports = CommentSchema
