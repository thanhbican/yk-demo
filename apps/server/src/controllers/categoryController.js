import slugify from 'slugify'

import { NotFoundError } from '../errors/notFoundError.js'
import Category from '../models/Category.js'

const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 })

  res.status(200).send(categories)
}

const getCategory = async (req, res) => {
  const { categoryId } = req.params
  const existingCategory = await Category.findById(categoryId)
  if (!existingCategory) {
    throw new NotFoundError('Category not found')
  }

  res.status(200).send(existingCategory)
}

const addCategory = async (req, res) => {
  const category = await Category.create({
    ...req.body,
    slug: slugify(req.body.type, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      replacement: '-',
    }),
  })

  res.status(200).send(category)
}
const editCategory = async (req, res) => {
  const { categoryId } = req.params
  const existingCategory = await Category.findById(categoryId)
  if (!existingCategory) {
    throw new NotFoundError('Category not found')
  }

  await existingCategory.updateOne({
    ...req.body,
    slug: slugify(req.body.type, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      replacement: '-',
    }),
  })

  res.status(200).send({})
}

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params
  const existingCategory = await Category.findById(categoryId)
  if (!existingCategory) {
    throw new NotFoundError('Category not found')
  }

  await existingCategory.deleteOne()

  res.status(200).send({})
}

export { getCategories, getCategory, addCategory, editCategory, deleteCategory }
