import { Schema, model } from 'mongoose'

const ContactSchema = new Schema(
  {
    name: String,
    email: String,
    message: String,
    phone: String,
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      },
    },
  }
)

export default model('Contact', ContactSchema)
