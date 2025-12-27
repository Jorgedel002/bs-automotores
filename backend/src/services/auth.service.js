const bcrypt = require('bcryptjs')
const pool = require('../config/db')

const normalizeUsername = (username) => {
  if (!username || typeof username !== 'string') {
    throw new Error('El nombre de usuario es obligatorio')
  }
  return username.trim().toLowerCase()
}

const validatePassword = (password) => {
  if (!password || typeof password !== 'string' || password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres')
  }
}

const registerUser = async ({ username, password }) => {
  const normalizedUsername = normalizeUsername(username)
  validatePassword(password)

  const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [normalizedUsername])
  if (existing.length > 0) {
    throw new Error('El usuario ya existe')
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const [result] = await pool.query(
    'INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, NOW())',
    [normalizedUsername, passwordHash],
  )

  return { id: result.insertId, username: normalizedUsername }
}

const loginUser = async ({ username, password }) => {
  const normalizedUsername = normalizeUsername(username)
  validatePassword(password)

  const [users] = await pool.query('SELECT id, username, password_hash FROM users WHERE username = ?', [normalizedUsername])
  if (users.length === 0) {
    throw new Error('Credenciales inválidas')
  }

  const user = users[0]
  const isValid = await bcrypt.compare(password, user.password_hash)
  if (!isValid) {
    throw new Error('Credenciales inválidas')
  }

  return { id: user.id, username: user.username }
}

module.exports = { registerUser, loginUser }
