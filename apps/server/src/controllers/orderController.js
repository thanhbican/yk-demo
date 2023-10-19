import { NotFoundError } from '../errors/notFoundError.js'
import { sendOrderConfirmationEmail } from '../middlewares/sendEmail.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

const getOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 })

  res.status(200).send(orders)
}

const getOrder = async (req, res) => {
  const { orderId } = req.params
  const existingOrder = await Order.findById(orderId)
  if (!existingOrder) {
    throw new NotFoundError('Order not found')
  }

  res.status(200).send(existingOrder)
}

const postOrder = async (req, res) => {
  const { products: productIds, lang } = req.body
  const products = await Product.find({
    _id: { $in: productIds },
    status: 'available',
  })
  const total = products.reduce((acc, product) => acc + product.price, 0)
  const order = await Order.create({ ...req.body, products, total })

  sendOrderConfirmationEmail(order, lang)

  res.status(200).send(order)
}

const readOrder = async (req, res) => {
  const { orderId } = req.params
  const existingOrder = await Order.findById(orderId)
  if (!existingOrder) {
    throw new NotFoundError('Order not found')
  }

  await existingOrder.updateOne({ isRead: true })

  res.status(200).send({})
}

const deleteOrder = async (req, res) => {
  const { orderId } = req.params
  const existingOrder = await Order.findById(orderId)
  if (!existingOrder) {
    throw new NotFoundError('Order not found')
  }

  await existingOrder.deleteOne()
  res.status(200).send({})
}

export { getOrder, getOrders, postOrder, readOrder, deleteOrder }
