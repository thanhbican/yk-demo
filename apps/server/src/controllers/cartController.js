import Product from '../models/Product.js'

const checkCart = async (req, res) => {
  const { productIds } = req.body
  const products = await Product.find({
    _id: { $in: productIds },
    status: 'available',
  })

  const isChange = !productIds.every((productId) =>
    products.some((product) => product._id.equals(productId))
  )
  res.status(200).send({ products, isChange })
}

export { checkCart }
