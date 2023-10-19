import slugify from 'slugify'

import { NotFoundError } from '../errors/notFoundError.js'
import { deleteImage } from '../middlewares/upload.js'
import Product from '../models/Product.js'

const getAllProducts = async (req, res) => {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .populate('category')
    .lean()

  const modifiedProducts = products.map((product) => {
    return {
      ...product,
      category: product.category.type,
      id: product._id,
    }
  })
  res.status(200).send(modifiedProducts)
}
const getProduct = async (req, res) => {
  const { productSlug } = req.params

  const product = await Product.findOne({
    slug: productSlug,
    status: 'available',
  })
  if (!product) {
    throw new NotFoundError('Product not found')
  }
  res.status(200).send(product)
}

const getProductAdmin = async (req, res) => {
  const { productSlug } = req.params

  const product = await Product.findOne({
    slug: productSlug,
  })
  if (!product) {
    throw new NotFoundError('Product not found')
  }
  res.status(200).send(product)
}

const addProduct = async (req, res) => {
  const product = { images: [] }
  if (req.compressedImages.length) {
    for (const file of req.compressedImages.length) {
      if (file) {
        product.images.push(file)
      }
    }
  }
  const { ...rest } = req.body
  const newProduct = {
    ...rest,
    images: product.images,
    slug: slugify(req.body.name, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      replacement: '-',
    }),
  }
  await Product.create(newProduct)

  res.status(200).send({})
}
const editProduct = async (req, res) => {
  const { productId } = req.params
  const product = await Product.findById(productId)
  if (!product) {
    throw new NotFoundError('Product not found')
  }

  let { currentImages, deleteImages, ...rest } = req.body
  currentImages = JSON.parse(currentImages)
  // delete images
  if (deleteImages) {
    for (const file of JSON.parse(deleteImages)) {
      await deleteImage(file)
      currentImages = currentImages.filter((img) => img.fileId !== file.fileId)
    }
  }

  // upload images
  if (req.compressedImages.length) {
    for (const file of req.compressedImages) {
      if (file) {
        const index = currentImages.findIndex((img) => !img._id && !img.fileUrl)
        currentImages.splice(index, 1, file)
      }
    }
  }

  await product.updateOne({
    ...rest,
    images: currentImages,
    slug: slugify(req.body.name, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      replacement: '-',
    }),
  })

  res.status(200).send(product)
}
const deleteProduct = async (req, res) => {
  const { productId } = req.params
  const product = await Product.findById(productId)
  if (!product) {
    throw new NotFoundError('Product not found')
  }

  for (const file of product.images) {
    await deleteImage(file)
  }

  await product.deleteOne()

  res.status(200).send({})
}

export {
  getAllProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
  getProductAdmin,
}
