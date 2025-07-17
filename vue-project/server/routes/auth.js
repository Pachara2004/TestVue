const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username])
  if (rows.length === 0) return res.status(401).json({ message: 'User not found' })

  const user = rows[0]
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ message: 'Incorrect password' })

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

router.get('/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Missing token' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    res.json({ user: decoded })
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' })
  }
})

module.exports = router
