// server/index.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pool from './config/db.js'; // Importa el pool de conexión
import authRoutes from './routes/auth.js'; // Importa las rutas de autenticación
import userRoutes from './routes/user.js';  // registrar nuevo usuario
import turnosRoutes from './routes/turnos.js';// registrar turnos
import barberRoutes from './routes/barber.js';  //calendario del barbero
import adminRoutes from './routes/admin.js'; //metricas para el administrador




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CORS: Permite peticiones desde tu frontend (ej: http://localhost:5173)
app.use(cors({
    origin: 'http://localhost:5173', // puerto Vite/React 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json({ extended: true })); // Permite a Express leer JSON en el cuerpo de las peticiones
app.use(cookieParser()); 
// Rutas de la API
app.use('/api/auth', authRoutes); // Todas las rutas de auth (registro, login) irán aquí
app.use('/api/user', userRoutes);
app.use('/api/turnos', turnosRoutes);
app.use('/api/barber', barberRoutes);
app.use('/api/admin', adminRoutes);



// Ruta de prueba simple
app.get('/', (req, res) => {
    res.send('API de Barbería funcionando!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
});