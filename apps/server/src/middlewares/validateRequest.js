import { validationResult } from 'express-validator'

import { RequestValidatorError } from '../errors/requestValidatorError.js'

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new RequestValidatorError(errors.array())
  }
  next()
}
