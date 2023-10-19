import express from 'express'
import { rateLimit } from 'express-rate-limit'
import { body } from 'express-validator'

import {
  changePassword,
  getUser,
  login,
  logout,
  register,
} from '../controllers/accountController.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // 100 requests per hour
  message: 'Too many requests from this IP, please try again later.',
})

const router = express.Router()

router.get('/admin/user', requireAuth, getUser)

// router.post(
//   '/admin/register',
//   [
//     body('email').isEmail().notEmpty().withMessage('email must be not empty'),
//     body('password').notEmpty().withMessage('password must be not empty'),
//   ],
//   validateRequest,
//   register
// )

router.post(
  '/admin/login',
  [
    body('email').isEmail().notEmpty().withMessage('email must be not empty'),
    body('password').notEmpty().withMessage('password must be not empty'),
  ],
  validateRequest,
  apiLimiter,
  login
)
router.post('/admin/logout', requireAuth, logout)
router.post(
  '/admin/password',
  requireAuth,
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('You must supply a password'),
    body('newPassword').notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  changePassword
)

export default router
