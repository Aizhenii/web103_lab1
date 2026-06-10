import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import restaurantData from '../data/restaurant.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()
router.get('/', (req, res) => {
  res.status(200).json(restaurantData)
})

router.get('/:restaurantId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/restaurant.html'))
})

export default router