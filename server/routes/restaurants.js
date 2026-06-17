import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import RestaurantsController from '../controllers/restaurants.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', GiftsController.getGifts)

router.get('/:restaurantId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/restaurant.html'))
})

export default router