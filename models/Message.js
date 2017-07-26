const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
)

// This will create a collection called messages
module.exports = mongoose.model('Message', MessageSchema)