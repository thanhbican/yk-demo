// import { Schema, model } from 'mongoose'

// const CartSchema = new Schema(
//   {
//     cartToken: {
//       type: String,
//       unique: true,
//     },
//     products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
//   },
//   {
//     expireAfterSeconds: 90 * 24 * 60 * 60,
//     timestamps: true,
//     toJSON: {
//       transform: function (doc, ret) {
//         ret.id = ret._id
//         delete ret._id
//         delete ret.__v
//       },
//     },
//   }
// )

// export default model('Cart', CartSchema)
