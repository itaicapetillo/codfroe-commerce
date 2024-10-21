const mongoose = require('mongoose');

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Almacen', { // Cambia 'buscador' a 'Almacen'
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1); // Termina el proceso si hay un error de conexión
  }
};

// Exportar la función de conexión
module.exports = connectDB;
