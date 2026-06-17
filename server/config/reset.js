import { pool } from './database.js'
import './dotenv.js'
import restaurantData from '../data/restaurant.js'

async function createRestaurantsTable() {

    const createTableQuery = `
        DROP TABLE IF EXISTS restaurants;

        CREATE TABLE IF NOT EXISTS restaurants (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        )
    `
    try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 restaurant table created successfully')
    } catch (err) {
    console.error('⚠️ error creating restaurant table', err)
    throw err
    }
}

const seedRestaurantsTable = async () => {
  try {
    await createRestaurantsTable()

    for (const restaurant of restaurantData) {
        const insertQuery = {
            text: 'INSERT INTO restaurants (name, pricePoint, image, description) VALUES ($1, $2, $3, $4)'
        }

        const values = [
            restaurant.name,
            restaurant.pricePoint,
            restaurant.image,
            restaurant.description,
        ]

        await pool.query(insertQuery, values)
        console.log(`✅ ${restaurant.name} added successfully`)
    }
  } catch (err) {
    console.error('⚠️ error resetting restaurants table', err)
  } finally {
    await pool.end()
  }
}

seedRestaurantsTable()
