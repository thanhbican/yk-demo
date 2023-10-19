import { NotAuthError } from '../errors/notAuthError.js'

export const requireAuth = (req, res, next) => {
  if (!req?.user) {
    throw new NotAuthError()
  }
  next()
}
