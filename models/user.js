const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    openid: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    nickName: { type: String, required: true },
    department: { type: String },

    // user authority
    isAdmin: { type: Boolean, default: false },
    canSendMessage: { type: Boolean, default: false},

    replys: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
    attentionTopics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
