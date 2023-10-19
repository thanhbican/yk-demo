import mongoose from 'mongoose'

import app from './app.js'
import { ServerError } from './src/errors/serverError.js'

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
  } catch (err) {
    console.error(err)
    throw new ServerError()
  }
  app.listen(port, () => {
    console.log('Listening 3000')
  })
}

start()
