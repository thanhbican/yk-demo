import { Schema, model } from 'mongoose'

const CategorySchema = new Schema(
  {
    type: {
      type: String,
      lowercase: true,
      unique: true,
    },
    isDisplay: {
      type: Boolean,
      default: false,
    },
    slug: { type: String, unique: true },
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

export default model('Category', CategorySchema)
