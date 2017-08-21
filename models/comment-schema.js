const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User'},
    content: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = CommentSchema
