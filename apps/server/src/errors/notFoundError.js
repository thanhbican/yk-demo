import { CustomError } from './customError.js'

export class NotFoundError extends CustomError {
  status = 404
  constructor(message) {
    super()
    this.message = message
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
