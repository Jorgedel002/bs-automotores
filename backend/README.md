# BS Automotores – Backend Node.js

## Requisitos
- Node.js 20+
- MySQL 8+ (base de datos `bs_automotores` y usuario con permisos)

## Configuración
1. Copiá `.env.example` a `.env` y ajustá credenciales:
   ```bash
   cp .env.example .env
   ```
   Variables disponibles:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `PORT`
2. Inicializá tablas (ejemplo SQL):
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     username VARCHAR(100) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

## Scripts
```bash
npm install
npm run dev    # nodemon
npm start      # node src/index.js
```

## Endpoints
- `POST /api/auth/register`
  ```json
  { "username": "asesor", "password": "123456" }
  ```
- `POST /api/auth/login` (mismos campos)
