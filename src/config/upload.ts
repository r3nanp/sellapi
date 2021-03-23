import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const rootPath = path.resolve(__dirname, '..', '..', 'uploads')

export default {
  directory: rootPath,
  storage: multer.diskStorage({
    destination: rootPath,
    filename: (_request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      callback(null, fileName)
    }
  })
}
