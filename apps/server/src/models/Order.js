import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
  {
    name: String,
    email: String,
    message: String,
    phone: String,
    address: String,
    isRead: { type: Boolean, default: false },
    products: [
      {
        status: {
          type: String,
          default: 'available',
          enum: ['available', 'sold'],
        },
        name: { type: String },
        slug: { type: String },
        description: Schema.Types.Mixed,
        price: Number,
        video: String,
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
    ],
    total: Number,
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

export default model('Order', OrderSchema)
