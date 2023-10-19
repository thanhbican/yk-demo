import { CustomError } from '../errors/customError.js'

export const errorHandle = (err, req, res, next) => {
  console.error(err)
  if (err instanceof CustomError) {
    return res.status(err.status).send(err.serializeErrors())
  }
  res.status(500).send('Something went wrong')
}
