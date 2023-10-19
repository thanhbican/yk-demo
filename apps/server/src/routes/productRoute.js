import express from 'express'

import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
  getProductAdmin,
} from '../controllers/productController.js'
import { requireAuth } from '../middlewares/requireAuth.js'
import { upload, uploadAndCompressImages } from '../middlewares/upload.js'

const router = express.Router()

//Admin
router.get('/admin/products', requireAuth, getAllProducts)
router.get('/admin/product/:productSlug', requireAuth, getProductAdmin)
router.post(
  '/admin/product',
  requireAuth,
  upload.array('images'),
  uploadAndCompressImages,
  addProduct
)
router.patch(
  '/admin/product/:productId',
  requireAuth,
  upload.array('images'),
  uploadAndCompressImages,
  editProduct
)
router.delete('/admin/product/:productId', requireAuth, deleteProduct)

//Client
// router.get('/products', getAllProducts)
router.get('/product/:productSlug', getProduct)

export default router
