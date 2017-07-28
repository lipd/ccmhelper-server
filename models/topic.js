const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema(
  {
    author: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    content: { type: String },
    attentionCount: { type: Number, default: 0 },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
  },
  { timestamps:true }
)

module.exports = mongoose.model('Topic', TopicSchema)