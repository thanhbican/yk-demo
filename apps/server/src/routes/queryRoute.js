import express from 'express'

import {
  queryHomePage,
  queryProductByCategory,
  queryProductBySearch,
  queryRelatedProduct,
} from '../controllers/queryController.js'

const router = express.Router()

router.get('/query/product/homePage', queryHomePage)
router.get('/query/product/search', queryProductBySearch)
router.get('/query/product/category/:categoryType', queryProductByCategory)
router.get('/query/product/related-products/:productId', queryRelatedProduct)

// router.get('/query/product/newest', queryNewestProduct)
// router.get('/query/category/:categoryName', queryCategory)
export default router
