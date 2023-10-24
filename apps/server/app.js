import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import 'dotenv/config'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { currentUser } from './src/middlewares/currentUser.js'
import { errorHandle } from './src/middlewares/errorHandle.js'
import accountRoute from './src/routes/accountRoute.js'
import cartRoute from './src/routes/cartRoute.js'
import categoryRoute from './src/routes/categoryRoute.js'
import contactRoute from './src/routes/contactRoute.js'
import orderRoute from './src/routes/orderRoute.js'
import productRoute from './src/routes/productRoute.js'
import queryRoute from './src/routes/queryRoute.js'

const app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(bodyParser.json())

// cors
const corsOptions = {
  origin: 'https://app.s4md.com/',
}
app.use(cors(corsOptions))

// session
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV.trim() !== 'development',
  })
)
// morgan
app.use(morgan('dev'))

// route
app.use(currentUser)
app.use('/api', accountRoute)
app.use('/api', productRoute)
app.use('/api', cartRoute)
app.use('/api', contactRoute)
app.use('/api', orderRoute)
app.use('/api', categoryRoute)
app.use('/api', queryRoute)

// errors handle
app.use(errorHandle)

export default app
