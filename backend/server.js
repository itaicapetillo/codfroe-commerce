// server.js

const express = require('express');
const connectDB = require('./db');
const productRoutes = require('./routes/productRoutes'); // Rutas de productos
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const app = express();
const port = 3000;

app.use(express.json());

connectDB();

// Rutas de la API
app.use('/api/products', productRoutes); // Rutas de productos
app.use('/api/auth', authRoutes); // Rutas de autenticación

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la tienda en línea!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
