import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import sharp from 'sharp'

const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT)
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET_KEY,
})

// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: process.env.SPACES_BUCKET_NAME,
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       const fileName = `${Date.now()}-${file.originalname}`
//       cb(null, `${process.env.SPACES_FOLDER_NAME}/${fileName}`)
//     },
//   }),
// })

const upload = multer({
  storage: multer.memoryStorage(),
})

const uploadAndCompressImages = async (req, res, next) => {
  try {
    const files = req.files || []

    const compressedImages = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`

        // Use Sharp to resize and compress the image
        const compressedBuffer = await sharp(file.buffer)
          .rotate()
          .resize(/* Specify your desired dimensions here */)
          .toBuffer()

        // Upload the compressed image to DigitalOcean Spaces
        const image = await s3
          .upload({
            Bucket: process.env.SPACES_BUCKET_NAME,
            Key: `${process.env.SPACES_FOLDER_NAME}/${fileName}`,
            Body: compressedBuffer,
            ACL: 'public-read',
          })
          .promise()

        return {
          fileId: image.Key,
          fileName: file.originalname,
          fileUrl: image.Location.startsWith('https://')
            ? image.Location
            : `https://${image.Location}`,
        }
      })
    )

    req.compressedImages = compressedImages
    next()
  } catch (error) {
    next(error)
  }
}

// export async function uploadImage(file) {
//   if (!file) return null
//   const fileId = file.key
//   const fileName = file.originalname
//   const fileUrl = file.location.startsWith('https://')
//     ? file.location
//     : `https://${file.location}`

//   return { fileId, fileName, fileUrl }
// }

export async function deleteImage(image) {
  if (!image || !image.fileUrl) return false

  const params = {
    Bucket: process.env.SPACES_BUCKET_NAME,
    Key: image.fileId,
  }

  try {
    await s3.deleteObject(params).promise()
    return true
  } catch (error) {
    console.error('Error deleting image:', error)
    return false
  }
}

export { upload, uploadAndCompressImages }
