import { pool } from '../config/database.js'

const getRestaurants = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM restaurants ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
} 

export default {
  getRestaurants
}