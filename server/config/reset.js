import './dotenv.js'
import { pool } from './database.js'


const createCustomItemTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS CustomItems;
        CREATE TABLE CustomItems (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            convertible BOOLEAN NOT NULL,
            exterior VARCHAR(100) NOT NULL,
            interior VARCHAR(100) NOT NULL,
            roof VARCHAR(100) NOT NULL,
            wheels VARCHAR(100) NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
  try {
    await pool.query(createTableQuery);
    console.log('🎉 customitems table created successfully');
  } catch (err) {
    console.error('⚠️ error creating customitems table', err);
  }
};
createCustomItemTable();