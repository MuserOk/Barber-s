// server/routes/turnos.js

import express from 'express';
import pool from '../config/db.js'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware para verificar el JWT (Protección de Rutas)
// Lo copiamos de user.js para que sea un módulo independiente
const protect = (req, res, next) => {
    const token = req.cookies.hs_token; 

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no encontrado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.clearCookie('hs_token');
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};


// [POST] /api/turnos - Crear una nueva reserva de turno
router.post('/', protect, async (req, res) => {
    const id_cliente = req.user.id; // ID del cliente logueado (del token)
    const { id_barbero, id_servicio, fecha, hora } = req.body;

    // 1. Validación de datos
    if (!id_barbero || !id_servicio || !fecha || !hora) {
        return res.status(400).json({ message: 'Faltan campos obligatorios para la reserva.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // 2. Calcular fecha y hora de inicio/fin
        const fecha_hora_inicio = `${fecha} ${hora}:00`;
        
        // Obtener la duración del servicio para calcular la hora de fin
        const [serviceResult] = await connection.query('SELECT duracion_minutos, precio FROM servicios WHERE id_servicio = ?', [id_servicio]);
        const service = serviceResult[0];

        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado.' });
        }

        const duracion_minutos = service.duracion_minutos;
        const precio_final = service.precio;
        
       // Calcular fecha_hora_fin (MÉTODO MEJORADO PARA MANTENER HORA LOCAL)
const start = new Date(fecha_hora_inicio); // Esto crea una fecha en la zona horaria del servidor
start.setMinutes(start.getMinutes() + duracion_minutos); // Añadir los minutos

// Formatear la fecha de fin a 'YYYY-MM-DD HH:MM:SS' sin conversión de zona horaria
const pad = (num) => num.toString().padStart(2, '0');

const fecha_hora_fin = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())} ${pad(start.getHours())}:${pad(start.getMinutes())}:${pad(start.getSeconds())}`;


        // 3. Verificar disponibilidad (¡CRUCIAL!)
        const [conflict] = await connection.query(
            `SELECT id_turno FROM turnos 
             WHERE id_barbero = ? 
             AND fecha_hora_inicio < ? 
             AND fecha_hora_fin > ? 
             AND estado IN ('Pendiente', 'Confirmado')`,
            [id_barbero, fecha_hora_fin, fecha_hora_inicio]
        );

        if (conflict.length > 0) {
            return res.status(409).json({ message: 'El barbero no está disponible en ese horario.' });
        }

        // 4. Crear el turno
        const insertQuery = `
            INSERT INTO turnos 
            (id_cliente, id_barbero, id_servicio, fecha_hora_inicio, fecha_hora_fin, precio_final, estado) 
            VALUES (?, ?, ?, ?, ?, ?, 'Confirmado')
        `;
        
        const [result] = await connection.query(insertQuery, [
            id_cliente, 
            id_barbero, 
            id_servicio, 
            fecha_hora_inicio, 
            fecha_hora_fin,
            precio_final
        ]);

        // 5. Respuesta exitosa
        res.status(201).json({ 
            message: 'Turno reservado exitosamente', 
            turnoId: result.insertId,
            precio: precio_final
        });

    } catch (error) {
        console.error('Error al crear turno:', error);
        res.status(500).json({ message: 'Error interno del servidor al reservar turno.' });
    } finally {
        if (connection) connection.release();
    }
});

export default router;