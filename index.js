import fetch, { Headers } from 'node-fetch'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRouter from './routes/chat.js'
import './config/db.js'

globalThis.fetch = fetch
globalThis.Headers = Headers
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', chatRouter)

const PORT = process.env.PORT || 7000
app.listen(PORT, () => {
  console.log(`\n🚀 AI API running on http://localhost:${PORT}`)
  console.log(`\nRoutes:`)
  console.log(`  GET  http://localhost:${PORT}/`)
  console.log(`  POST http://localhost:${PORT}/chat`)
  console.log(`  POST http://localhost:${PORT}/chat/simple`)
})
