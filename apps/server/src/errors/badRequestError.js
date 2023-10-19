import { CustomError } from './customError.js'

export class BadRequestError extends CustomError {
  status = 400
  constructor(message) {
    super()
    this.message = message
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
