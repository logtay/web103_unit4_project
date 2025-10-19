import { pool } from "../config/database";

const createItem = async (req, res) => {
  try {
    const { name, convertible, exterior, interior, roof, wheels, price } = req.body;

    const results = await pool.query(
      `
      INSERT INTO CustomItems (name, convertible, exterior, interior, roof, wheels, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [name, convertible, exterior, interior, roof, wheels, price]
    );

    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

const getItems = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM CustomItems ORDER BY date_created DESC');
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateItem = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const { name, convertible, exterior, interior, roof, wheels, price } = req.body
      const results = await pool.query(`
          UPDATE CustomItems SET name = $1, convertible = $2, exterior = $3, interior = $4, roof = $5, wheels = $6, price = $7 WHERE id = $8`,
          [name, convertible, exterior, interior, roof, wheels, price, id]
      )
      res.status(200).json(results.rows[0])
    } catch (error) {
      res.status(409).json({ error: error.message })
    }
}
    
const deleteItem = async (req, res) => {
  try {
      const id = parseInt(req.params.id)
      const results = await pool.query('DELETE FROM CustomItems WHERE id = $1', [id])
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(409).json( { error: error.message } )
  }
}

const getItemById = async (req, res) => {
  try {
      const id = parseInt(req.params.itemId)
      const results = await pool.query('SELECT * FROM CustomItems WHERE id = $1', [id])
      res.status(200).json(results.rows[0])
  } catch (error) {
      res.status(500).json( { error: error.message } )
  }
}

export default { createItem, getItems, updateItem, deleteItem, getItemById };