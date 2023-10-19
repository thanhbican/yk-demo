import jwt from 'jsonwebtoken'

export const currentUser = (req, res, next) => {
  const token =
    req.session?.jwt || req.header('Authorization')?.replace('Bearer ', '')
  if (!token) {
    return next()
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN)
    req.user = payload
  } catch (err) {
    console.error(err)
  }
  next()
}
