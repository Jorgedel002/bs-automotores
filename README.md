# BS Automotores

Sistema de gestión para concesionaria de autos usados. Aplicación fullstack con backend Node.js/Express y frontend React/TypeScript.

## 📋 Requisitos Previos

- **Node.js** 20+ ([descargar](https://nodejs.org/))
- **MySQL** 8+ ([descargar](https://dev.mysql.com/downloads/mysql/))
- **Git** (opcional, para clonar el repositorio)

## 🗄️ Configuración de Base de Datos

### 1. Crear la base de datos

Abrí MySQL Workbench o tu cliente MySQL preferido y ejecutá:

```sql
CREATE DATABASE bs_automotores CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Crear la tabla de usuarios

```sql
USE bs_automotores;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> **Nota**: Las tablas de clientes, prospectos y vehículos aún no están implementadas en el backend. Por ahora, el frontend usa datos mock.

## 🚀 Instalación y Ejecución

### Backend (API)

1. **Navegar a la carpeta del backend**:
   ```bash
   cd backend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   
   Creá un archivo `.env` en la carpeta `backend/` con el siguiente contenido:
   
   ```env
   # Base de datos
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=tu_password_mysql
   DB_NAME=bs_automotores
   
   # Servidor
   PORT=4000
   
   # CORS (opcional, por defecto usa http://localhost:5173)
   ALLOWED_ORIGINS=http://localhost:5173
   ```
   
   **Ajustá** `DB_USER` y `DB_PASSWORD` según tu configuración de MySQL.

4. **Iniciar el servidor**:
   
   **Modo desarrollo** (con auto-reload):
   ```bash
   npm run dev
   ```
   
   **Modo producción**:
   ```bash
   npm start
   ```

5. **Verificar que funciona**:
   
   El servidor debería estar corriendo en `http://localhost:4000`

### Frontend (React)

1. **Abrir una nueva terminal** y navegar a la carpeta del frontend:
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   
   El frontend estará disponible en `http://localhost:5173`

## 🔐 Primer Uso

### Registrar un usuario

1. Abrí `http://localhost:5173/registro` en tu navegador
2. Creá un usuario con username y password (mínimo 6 caracteres)
3. Iniciá sesión en `http://localhost:5173/login`

### Explorar el dashboard

Una vez autenticado, vas a poder acceder a:
- **Dashboard** (`/`) — vista general con clientes, prospectos y autos
- **Clientes** (`/clientes`) — gestión de clientes
- **Prospectos** (`/prospectos`) — embudo comercial
- **Autos** (`/autos`) — inventario de vehículos

> **Importante**: Los datos de clientes, prospectos y vehículos son **mock data** (datos de prueba hardcodeados). Los formularios solo hacen `console.log` y no persisten nada en la base de datos todavía.

## 📁 Estructura del Proyecto

```
BSAutomotores/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # Conexión MySQL
│   │   ├── routes/
│   │   │   └── auth.routes.js     # Rutas de autenticación
│   │   ├── services/
│   │   │   └── auth.service.js    # Lógica de negocio auth
│   │   └── index.js               # Entry point del servidor
│   ├── .env                       # Variables de entorno (crear)
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/            # Componentes reutilizables
    │   ├── context/               # Context API (Auth, Data)
    │   ├── data/                  # Mock data
    │   ├── pages/                 # Páginas principales
    │   ├── utils/                 # Utilidades
    │   ├── App.tsx                # Rutas principales
    │   └── main.tsx               # Entry point
    ├── public/
    └── package.json
```

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js (CommonJS)
- **Framework**: Express 4.21
- **Base de datos**: MySQL 8+ con mysql2
- **Autenticación**: bcryptjs
- **Seguridad**: CORS

### Frontend
- **Framework**: React 19.2
- **Lenguaje**: TypeScript 5.9
- **Build tool**: Vite 7.2
- **Routing**: React Router DOM 7.10
- **Estilos**: TailwindCSS 3.4
- **Iconos**: Lucide React
- **PDF**: pdf-lib

## 🚧 Estado Actual del Proyecto

### ✅ Implementado
- Autenticación básica (registro/login)
- UI completa del frontend
- Componentes reutilizables
- Routing y navegación
- Diseño responsive

### ⚠️ Pendiente
- **Backend CRUD** para clientes, prospectos y vehículos
- **Integración frontend-backend** (reemplazar mock data)
- **JWT** para autenticación con tokens
- **Middleware** de protección de rutas
- **Upload de imágenes** para vehículos
- **Validación** de datos en backend
- **Manejo de errores** centralizado

## 📝 Scripts Disponibles

### Backend
```bash
npm run dev    # Desarrollo con nodemon (auto-reload)
npm start      # Producción
```

### Frontend
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 🐛 Troubleshooting

### Error de conexión a MySQL
- Verificá que MySQL esté corriendo
- Revisá las credenciales en el archivo `.env`
- Asegurate de que la base de datos `bs_automotores` exista

### Error CORS en el frontend
- Verificá que el backend esté corriendo en el puerto 4000
- Revisá la variable `ALLOWED_ORIGINS` en el `.env` del backend

### Los formularios no guardan datos
- Esto es **esperado**. El backend solo tiene autenticación implementada
- Los datos de clientes/prospectos/autos son mock data y no se persisten

## 📧 Contacto

Para consultas sobre el proyecto, contactá al equipo de desarrollo de BS Automotores.
