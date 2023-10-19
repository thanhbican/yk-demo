import express from 'express'
import { body } from 'express-validator'

import { checkCart } from '../controllers/cartController.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const router = express.Router()

router.post(
  '/cart/',
  [
    body('productIds').isArray().withMessage('productIds must be an array'),
    body('productIds.*')
      .isMongoId()
      .withMessage('productIds must contain valid ObjectIds'),
  ],
  validateRequest,
  checkCart
)

export default router
