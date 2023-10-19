import { CustomError } from './customError.js'

export class ServerError extends CustomError {
  status = 500
  message = 'Something went wrong'
  constructor() {
    super()
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
