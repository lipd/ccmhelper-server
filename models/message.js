const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = require('./comment-schema')

const MessageSchema = new Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    content: { type: String, required: true },
    comments: [CommentSchema]
  },
  { timestamps: true }
)

// This will create a collection called messages
module.exports = mongoose.model('Message', MessageSchema)
