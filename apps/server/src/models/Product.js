import { Schema, model } from 'mongoose'

const ProductSchema = new Schema(
  {
    status: { type: String, default: 'available', enum: ['available', 'sold'] },
    name: { type: String, unique: true },
    slug: { type: String, unique: true },
    description: Schema.Types.Mixed,
    price: Number,
    videoURL: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    manufacturer: String,
    model: String,
    serialNumber: String,
    hours: Number,
    images: [
      {
        fileId: String,
        fileName: String,
        fileUrl: String,
      },
    ],
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

export default model('Product', ProductSchema)
