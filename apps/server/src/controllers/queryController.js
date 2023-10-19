import { NotFoundError } from '../errors/notFoundError.js'
import Category from '../models/Category.js'
import Product from '../models/Product.js'

const queryHomePage = async (req, res) => {
  const newestProducts = await Product.find({ status: 'available' })
    .sort({ createdAt: -1 })
    .limit(6)

  const productsByCategory = await Category.aggregate([
    {
      $match: { isDisplay: true },
    },
    {
      $lookup: {
        from: 'products',
        let: { categoryId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$category', '$$categoryId'] },
                  { $eq: ['$status', 'available'] },
                ],
              },
            },
          },
          { $limit: 6 },
          {
            $project: {
              id: '$_id',
              status: 1,
              name: 1,
              slug: 1,
              description: 1,
              price: 1,
              video: 1,
              category: 1,
              manufacturer: 1,
              model: 1,
              serialNumber: 1,
              hours: 1,
              images: 1,
            },
          },
        ],
        as: 'products',
      },
    },
    {
      $project: {
        type: '$type',
        slug: '$slug',
        products: 1,
        id: '$_id',
      },
    },
  ])
  res.status(200).send({ newestProducts, productsByCategory })
}
const queryProductByCategory = async (req, res) => {
  const { categoryType } = req.params
  const { sort } = req.query
  const page = parseInt(req.query.page) || 1
  const limit = 9

  let category = null
  if (categoryType !== 'all') {
    category = await Category.findOne({ slug: categoryType })
    if (!category) {
      throw new NotFoundError('Category not found')
    }
  }

  let sortOption = {}
  switch (sort) {
    case 'newest':
      sortOption = { createdAt: -1 }
      break
    case 'asc':
      sortOption = { price: 1 }
      break
    case 'desc':
      sortOption = { price: -1 }
      break
    default:
      sortOption = { createdAt: -1 }
      break
  }

  const query =
    categoryType !== 'all'
      ? { category: category._id, status: 'available' }
      : { status: 'available' }
  const [products, totalProducts] = await Promise.all([
    Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category'),
    Product.aggregate([
      { $match: query },
      { $group: { _id: null, count: { $sum: 1 } } },
    ])
      .exec()
      .then((result) => (result.length > 0 ? result[0].count : 0)),
  ])
  const totalPages = Math.ceil(totalProducts / limit)
  res.status(200).send({ totalPages, products, totalProducts })
}

const queryProductBySearch = async (req, res) => {
  const { searchValue } = req.query
  const { sort } = req.query
  const page = parseInt(req.query.page) || 1
  const limit = 8

  let sortOption = {}
  switch (sort) {
    case 'newest':
      sortOption = { createdAt: -1 }
      break
    case 'asc':
      sortOption = { price: 1 }
      break
    case 'desc':
      sortOption = { price: -1 }
      break
    default:
      sortOption = { createdAt: -1 }
      break
  }
  const regex = new RegExp(searchValue, 'i')
  const query = {
    name: { $regex: regex },
    status: 'available',
  }
  const [products, totalProducts] = await Promise.all([
    Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('category'),
    Product.aggregate([
      { $match: query },
      { $group: { _id: null, count: { $sum: 1 } } },
    ])
      .exec()
      .then((result) => (result.length > 0 ? result[0].count : 0)),
  ])
  const totalPages = Math.ceil(totalProducts / limit)
  res.status(200).send({ totalPages, products, totalProducts })
}

const queryRelatedProduct = async (req, res) => {
  const { productId } = req.params
  const product = await Product.findById(productId)
  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const categoryId = product.category

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    category: categoryId,
    status: 'available',
  }).limit(3)

  res.status(200).send(relatedProducts)
}

export {
  queryHomePage,
  queryProductByCategory,
  queryProductBySearch,
  queryRelatedProduct,
}
