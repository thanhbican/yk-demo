import { CustomError } from './customError.js'

export class RequestValidatorError extends CustomError {
  status = 400
  constructor(errors) {
    super()
    this.errors = errors
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.path }
    })
  }
}
