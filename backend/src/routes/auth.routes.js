const express = require('express')
const { registerUser, loginUser } = require('../services/auth.service')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await loginUser(req.body)
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
