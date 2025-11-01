// server/routes/barber.js

import express from 'express';
import pool from '../config/db.js'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware para verificar el JWT y el ROL (Solo Barbero o Admin)
const protectBarber = (req, res, next) => {
    const token = req.cookies.hs_token; 

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no encontrado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Asumiendo que el rol 2 es Barbero y 1 es Admin
        if (decoded.rol !== 2 && decoded.rol !== 1) { 
            return res.status(403).json({ message: 'Acceso denegado. Solo para Barberos/Admin.' });
        }
        req.user = decoded; 
        next();
    } catch (error) {
        res.clearCookie('hs_token');
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

// [GET] /api/barber/events - Obtener todos los eventos (Turnos y Eventos_Calendario) del barbero logueado
router.get('/events', protectBarber, async (req, res) => {
    const id_barbero = req.user.id;

    try {
        // 1. Obtener Turnos (Citas)
        const [turnos] = await pool.query(
            `SELECT id_turno AS id, 'Cita con ' AS title, fecha_hora_inicio AS date_time, TIMESTAMPDIFF(MINUTE, fecha_hora_inicio, fecha_hora_fin) AS duration, 'appointment' AS type
             FROM turnos 
             WHERE id_barbero = ? AND estado IN ('Pendiente', 'Confirmado')`,
            [id_barbero]
        );
        
        // 2. Obtener Eventos de Calendario (Días Libres, Reuniones)
        const [eventos] = await pool.query(
            `SELECT id_evento AS id, titulo AS title, fecha_inicio AS date_time, 1440 AS duration, tipo AS type
             FROM eventos_calendario
             WHERE id_barbero = ? OR id_barbero IS NULL`, // Eventos personales o generales
            [id_barbero]
        );

        // 3. Combinar y enviar
        const combinedEvents = [...turnos, ...eventos];
        res.status(200).json(combinedEvents);

    } catch (error) {
        console.error('Error al obtener eventos del barbero:', error);
        res.status(500).json({ message: 'Error interno al obtener el calendario.' });
    }
});

// [POST] /api/barber/events - Agregar un nuevo evento (Día Libre, Reunión)
router.post('/events', protectBarber, async (req, res) => {
    const id_barbero = req.user.id;
    const { title, date, eventType } = req.body; // date es la fecha en formato YYYY-MM-DD

    if (!date || !eventType) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para el evento.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();
        
        const finalTitle = eventType === 'day_off' ? 'Día Franco' : title;
        const fecha_inicio = date + ' 00:00:00';
        const fecha_fin = eventType === 'day_off' ? date + ' 23:59:59' : null; // Para eventos de día completo

        const [result] = await connection.query(
            `INSERT INTO eventos_calendario 
             (id_barbero, titulo, fecha_inicio, fecha_fin, tipo) 
             VALUES (?, ?, ?, ?, ?)`,
            [id_barbero, finalTitle, fecha_inicio, fecha_fin, eventType]
        );

        res.status(201).json({ 
            message: 'Evento agregado exitosamente.', 
            eventId: result.insertId 
        });

    } catch (error) {
        console.error('Error al agregar evento:', error);
        res.status(500).json({ message: 'Error interno al agregar el evento.' });
    } finally {
        if (connection) connection.release();
    }
});

// [GET] /api/barber/performance - Obtener métricas de rendimiento del barbero logueado
router.get('/performance', protectBarber, async (req, res) => {
    const id_barbero = req.user.id;
    const currentMonthStart = new Date().toISOString().slice(0, 7) + '-01'; // YYYY-MM-01

    try {
        // 1. Clientes Atendidos y Propinas (Turnos Completados este mes)
        const [turnosData] = await pool.query(
            `SELECT 
                COUNT(id_turno) AS clientesAtendidos, 
                SUM(precio_final * 0.1) AS propinasEstimadas -- Asumiendo 10% de propina para el ejemplo
             FROM turnos 
             WHERE id_barbero = ? AND estado = 'Completado' AND fecha_hora_inicio >= ?`,
            [id_barbero, currentMonthStart]
        );
        
        // 2. Días y Horas Trabajadas (Registro de Asistencia)
        const [asistenciaData] = await pool.query(
            `SELECT 
                COUNT(DISTINCT DATE(hora_entrada)) AS diasTrabajados,
                SUM(TIMESTAMPDIFF(HOUR, hora_entrada, hora_salida)) AS horasTotales,
                SUM(horas_extra_minutos) AS horasExtrasMinutos,
                MAX(CASE WHEN hora_salida IS NULL THEN hora_entrada ELSE NULL END) AS lastClockIn
             FROM registro_asistencia 
             WHERE id_barbero = ? AND hora_entrada >= ?`,
            [id_barbero, currentMonthStart]
        );

        // 3. Combinar y calcular
        const performance = {
            diasTrabajados: asistenciaData[0]?.diasTrabajados || 0,
            horasTotales: asistenciaData[0]?.horasTotales || 0,
            horasExtras: (asistenciaData[0]?.horasExtrasMinutos || 0) / 60,
            clientesAtendidos: turnosData[0]?.clientesAtendidos || 0,
            propinas: turnosData[0]?.propinasEstimadas?.toFixed(2) || 0,
            sueldoMensual: (asistenciaData[0]?.horasTotales * 12.50).toFixed(2), // Sueldo base estimado
            isClockedIn: !!asistenciaData[0]?.lastClockIn,
            clockInTime: asistenciaData[0]?.lastClockIn
        };

        res.status(200).json(performance);

    } catch (error) {
        console.error('Error al obtener rendimiento:', error);
        res.status(500).json({ message: 'Error interno al obtener rendimiento.' });
    }
});

// [POST] /api/barber/clock-in - Marcar Entrada
router.post('/clock-in', protectBarber, async (req, res) => {
    const id_barbero = req.user.id;
    const now = new Date();

    try {
        // 1. Verificar si ya está registrado (hora_salida IS NULL)
        const [activeEntry] = await pool.query(
            'SELECT id_registro FROM registro_asistencia WHERE id_barbero = ? AND hora_salida IS NULL',
            [id_barbero]
        );

        if (activeEntry.length > 0) {
            return res.status(409).json({ message: 'Ya tienes una entrada activa.' });
        }

        // 2. Registrar la entrada
        const [result] = await pool.query(
            'INSERT INTO registro_asistencia (id_barbero, hora_entrada) VALUES (?, ?)',
            [id_barbero, now]
        );

        res.status(201).json({ 
            message: 'Entrada registrada exitosamente.', 
            clockInTime: now 
        });

    } catch (error) {
        console.error('Error al marcar entrada:', error);
        res.status(500).json({ message: 'Error interno al marcar entrada.' });
    }
});

// [POST] /api/barber/clock-out - Marcar Salida
router.post('/clock-out', protectBarber, async (req, res) => {
    const id_barbero = req.user.id;
    const now = new Date();

    try {
        // 1. Encontrar la entrada activa
        const [activeEntry] = await pool.query(
            'SELECT id_registro, hora_entrada FROM registro_asistencia WHERE id_barbero = ? AND hora_salida IS NULL',
            [id_barbero]
        );

        if (activeEntry.length === 0) {
            return res.status(409).json({ message: 'No tienes una entrada activa para marcar salida.' });
        }

        const { id_registro, hora_entrada } = activeEntry[0];
        
        // 2. Calcular horas trabajadas y horas extras (simplificado)
        // En un entorno real, la lógica de horas extras es más compleja.
        const totalDurationMs = now.getTime() - new Date(hora_entrada).getTime();
        const totalDurationHours = totalDurationMs / (1000 * 60 * 60);
        const standardHours = 8; // Asumiendo una jornada estándar de 8 horas
        const horasExtrasMinutos = Math.max(0, Math.round((totalDurationHours - standardHours) * 60));

        // 3. Registrar la salida y horas extras
        await pool.query(
            'UPDATE registro_asistencia SET hora_salida = ?, horas_extra_minutos = ? WHERE id_registro = ?',
            [now, horasExtrasMinutos, id_registro]
        );

        res.status(200).json({ 
            message: 'Salida registrada exitosamente.', 
            totalHours: totalDurationHours.toFixed(2) 
        });

    } catch (error) {
        console.error('Error al marcar salida:', error);
        res.status(500).json({ message: 'Error interno al marcar salida.' });
    }
});



export default router;