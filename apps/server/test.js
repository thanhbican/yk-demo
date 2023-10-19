import 'dotenv/config'
import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'

import Category from './src/models/Category.js'
import Product from './src/models/Product.js'

async function addProductsToDatabase(products) {
  try {
    // console.log(process.env.DATABASE_URL)
    // console.log(faker.commerce.productName())
    // console.log(faker.commerce.productName())
    await mongoose.connect(process.env.DATABASE_URL)
    // console.log(products)

    // await Category.create(categories)
    const createdProducts = await Product.create(products)

    console.log('Products added successfully:', createdProducts)
  } catch (error) {
    console.error('Error adding products:', error)
  } finally {
    mongoose.disconnect()
  }
}

async function generateFakeProducts(count) {
  await mongoose.connect(process.env.DATABASE_URL)
  const categoryCount = await Category.countDocuments()

  const products = []

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * categoryCount)
    const category = await Category.findOne().skip(randomIndex)
    const product = {
      status: 'available',
      name: faker.commerce.productName(),
      slug: faker.lorem.slug(),
      description: faker.lorem.sentence(),
      price: faker.commerce.price(),
      video: faker.internet.url(),
      // category: faker.database.mongodbObjectId(),
      category: category.id,
      manufacturer: faker.company.name(),
      model: faker.vehicle.model(),
      serialNumber: faker.string.alphanumeric(5),
      hours: faker.number.int(1000),
      images: [
        {
          fileId: faker.database.mongodbObjectId(),
          fileName: faker.system.fileName(),
          fileUrl: faker.image.urlPicsumPhotos(),
        },
      ],
    }

    products.push(product)
  }

  return products
}

const productsToAdd = await generateFakeProducts(20)
// console.log(productsToAdd)

addProductsToDatabase(productsToAdd)
