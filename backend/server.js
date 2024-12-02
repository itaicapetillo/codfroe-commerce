const express = require('express');
const path = require('path'); // Importar módulo path
const connectDB = require('./db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const { protect } = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas de la API
app.use('/api/products', productRoutes); // Rutas de productos
app.use('/api/auth', authRoutes); // Rutas de autenticación

// Ruta protegida de ejemplo
app.get('/api/protected', protect, (req, res) => {
  res.send(`¡Hola ${req.user.name}, estás autenticado!`);
});

// **Servir archivos estáticos desde la carpeta frontend**
app.use(express.static(path.join(__dirname, '../frontend')));

// **Ruta principal para devolver index.html**
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
