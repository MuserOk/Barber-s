// server/index.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pool from './config/db.js'; // Importa el pool de conexión
import authRoutes from './routes/auth.js'; // Importa las rutas de autenticación

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CORS: Permite peticiones desde tu frontend (ej: http://localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con el puerto real de tu Vite/React si es diferente
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // Permite a Express leer JSON en el cuerpo de las peticiones

// Rutas de la API
app.use('/api/auth', authRoutes); // Todas las rutas de auth (registro, login) irán aquí

// Ruta de prueba simple
app.get('/', (req, res) => {
    res.send('API de Barbería funcionando!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});