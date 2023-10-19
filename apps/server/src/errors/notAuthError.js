import { CustomError } from './customError.js'

export class NotAuthError extends CustomError {
  status = 401
  message = 'Not Authenticated'
  constructor() {
    super()
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
