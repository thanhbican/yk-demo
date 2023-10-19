import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../errors/badRequestError.js'
import { NotAuthError } from '../errors/notAuthError.js'
import Account from '../models/Account.js'

const getUser = (req, res) => {
  res.send({ user: req.user || null })
}

const register = async (req, res) => {
  const { email, password } = req.body

  const existingAccount = await Account.findOne({ email })
  if (existingAccount) {
    throw new BadRequestError('email has been existed')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const account = await Account.create({ email, password: hashedPassword })

  const jwtToken = jwt.sign(
    {
      id: account.id,
      email,
    },
    process.env.JWT_TOKEN,
    { expiresIn: 24 * 60 * 60 }
  )

  req.session = {
    jwt: jwtToken,
  }

  res.status(200).send({
    id: account.id,
    email,
  })
}
const login = async (req, res) => {
  const { email, password } = req.body
  const existingAccount = await Account.findOne({ email })
  if (!existingAccount) {
    throw new NotAuthError()
  }

  const validPassword = await bcrypt.compare(password, existingAccount.password)
  if (!validPassword) {
    throw new NotAuthError()
  }

  const jwtToken = jwt.sign(
    {
      id: existingAccount.id,
      email,
    },
    process.env.JWT_TOKEN,
    { expiresIn: 24 * 60 * 60 }
  )

  req.session = {
    jwt: jwtToken,
  }
  res.status(200).send({
    id: existingAccount.id,
    email,
    accessToken: jwtToken,
  })
}
const logout = (req, res) => {
  req.session = null
  res.status(200).send({})
}

const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body

  const existingAccount = await Account.findOne({ email })

  if (!existingAccount) {
    throw new NotAuthError()
  }
  const validPassword = await bcrypt.compare(password, existingAccount.password)
  if (!validPassword) {
    throw new NotAuthError()
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await existingAccount.updateOne({ password: hashedPassword })
  res.status(200).send({})
}

export { changePassword, getUser, register, login, logout }
