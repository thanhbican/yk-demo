import express from 'express'
import { body } from 'express-validator'

import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
} from '../controllers/categoryController.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { validateRequest } from '../middlewares/validateRequest.js'

const router = express.Router()

// client
router.get('/categories', getCategories)

// admin
router.get('/admin/categories', requireAuth, getCategories)
router.get('/admin/category/:categoryId', requireAuth, getCategory)
router.post(
  '/admin/category',
  requireAuth,
  [
    body('type').isString().withMessage('type must be not empty'),
    body('isDisplay').isBoolean().withMessage('isDisplay must be not empty'),
  ],
  validateRequest,
  addCategory
)
router.patch(
  '/admin/category/:categoryId',
  requireAuth,
  [
    body('type').isString().withMessage('type must be not empty'),
    body('isDisplay').isBoolean().withMessage('isDisplay must be not empty'),
  ],
  validateRequest,
  editCategory
)
router.delete('/admin/category/:categoryId', requireAuth, deleteCategory)

export default router
