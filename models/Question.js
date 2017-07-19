const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema(
  {
    _id: { type: Number, required: true },
    author: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    content: { type: String },
    attentionCount: { type: Number, default: 0 },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
  },
  { timestamps:true }
)

exports.Question = mongoose.model('Question', QuestionSchema)