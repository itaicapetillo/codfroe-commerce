const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Middleware para proteger las rutas
const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extraemos el token del encabezado

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no se proporcionó token' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');  // Verificamos si el token es válido
    req.user = decoded;  // Guardamos la información del usuario decodificada en req
    next();  // Continuamos con la siguiente función
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido' });
  }
};

// Registro de usuarios
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, 'secret', { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta protegida (solo accesible si el usuario está autenticado)
router.get('/protected', protect, (req, res) => {
  res.json({ message: `Bienvenido ${req.user.name}, estás autenticado.` });
});

module.exports = router;
