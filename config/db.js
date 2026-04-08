import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const db = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

db.query('SELECT NOW()', (err) => {
  if (err) console.log('❌ DB Error:', err.message)
  else console.log('✅ Database connected!')
})

export default db