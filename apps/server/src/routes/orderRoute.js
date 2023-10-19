import express from 'express'
import { body } from 'express-validator'

import {
  deleteOrder,
  getOrder,
  getOrders,
  postOrder,
  readOrder,
} from '../controllers/orderController.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const router = express.Router()

router.get('/admin/orders', requireAuth, getOrders)
router.get('/admin/order/:orderId', requireAuth, getOrder)
router.delete('/admin/order/:orderId', requireAuth, deleteOrder)

router.patch('/admin/order/:orderId/read', requireAuth, readOrder)

router.post(
  '/order',
  [
    body('name').notEmpty().withMessage('name must be not empty'),
    body('email').notEmpty().withMessage('email must be not empty'),
    body('phone').notEmpty().withMessage('phone must be not empty'),
    body('message').notEmpty().withMessage('message must be not empty'),
    body('address').notEmpty().withMessage('address must be not empty'),
    body('products').isArray().withMessage('products must be not empty'),
    body('lang').notEmpty().withMessage('lang must be not empty'),
  ],
  validateRequest,
  postOrder
)

export default router
