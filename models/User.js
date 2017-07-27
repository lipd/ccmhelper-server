const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    openId: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    nickName: { type: String, required: true },
    department: { type: String },

    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    attentionTopics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)