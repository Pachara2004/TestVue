import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'
import { createRequire } from "module";
const require = createRequire(import.meta.url);

dotenv.config({ path: './server/.env' })

const app = express()
app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/auth.js')  // ใช้ require ผ่าน createRequire

app.use('/api', authRoutes)

app.listen(3000, () => console.log('✅ Server running at http://localhost:3000'))
