import { Schema, model } from 'mongoose'

const AccountSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
})

export default model('Account', AccountSchema)
