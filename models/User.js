const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    openId: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    attentionQuestions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)