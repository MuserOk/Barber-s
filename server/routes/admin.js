// server/routes/admin.js

import express from 'express';
import pool from '../config/db.js'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware para verificar el JWT y el ROL (Solo Admin)
const protectAdmin = (req, res, next) => {
    const token = req.cookies.hs_token; 

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no encontrado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Asumiendo que el rol 1 es Admin
        if (decoded.rol !== 1) { 
            return res.status(403).json({ message: 'Acceso denegado. Solo para Administradores.' });
        }
        req.user = decoded; 
        next();
    } catch (error) {
        res.clearCookie('hs_token');
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

// [GET] /api/admin/dashboard - Obtener todas las métricas del dashboard
router.get('/dashboard', protectAdmin, async (req, res) => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const currentMonthStart = new Date().toISOString().slice(0, 7) + '-01';

    try {
        // 1. Ingresos y Citas Hoy
        const [todayMetrics] = await pool.query(
            `SELECT 
                COUNT(id_turno) AS citasHoy, 
                SUM(precio_final) AS ingresosHoy
             FROM TURNOS 
             WHERE DATE(fecha_hora_inicio) = ? AND estado = 'Completado'`,
            [today]
        );

        // 2. Clientes Nuevos (Este Mes)
        const [newClients] = await pool.query(
            `SELECT COUNT(id_usuario) AS clientesNuevosMes
             FROM USUARIOS 
             WHERE id_rol = 3 AND miembro_desde >= ?`, // Asumiendo rol 3 = Cliente
            [currentMonthStart]
        );

        // 3. Rating Promedio (General)
        const [rating] = await pool.query(
            `SELECT AVG(rating_cliente) AS ratingPromedio
             FROM TURNOS 
             WHERE rating_cliente IS NOT NULL`
        );

        // 4. Productos con Stock Bajo (Asumiendo stock < 5)
        const [lowStock] = await pool.query(
            `SELECT COUNT(id_producto) AS productosStockBajo
             FROM PRODUCTOS 
             WHERE stock < 5`
        );

        // 5. Citas de Hoy (Detalle)
        const [citasHoyDetalle] = await pool.query(
            `SELECT 
                t.fecha_hora_inicio, s.nombre AS servicio, u.nombre_completo AS cliente
             FROM TURNOS t
             JOIN SERVICIOS s ON t.id_servicio = s.id_servicio
             JOIN USUARIOS u ON t.id_cliente = u.id_usuario
             WHERE DATE(t.fecha_hora_inicio) = ? AND t.estado = 'Confirmado'
             ORDER BY t.fecha_hora_inicio ASC`,
            [today]
        );
        
        // 6. Barberos Activos (Simplificado: todos los barberos)
        const [barberosActivos] = await pool.query(
            `SELECT u.nombre_completo AS nombre, bd.rating_promedio AS rating
             FROM USUARIOS u
             JOIN BARBEROS_DETALLES bd ON u.id_usuario = bd.id_barbero
             WHERE u.id_rol = 2` // Asumiendo rol 2 = Barbero
        );


        // 7. Combinar y enviar
        res.status(200).json({
            ingresosHoy: todayMetrics[0]?.ingresosHoy?.toFixed(2) || 0,
            citasHoy: todayMetrics[0]?.citasHoy || 0,
            clientesNuevos: newClients[0]?.clientesNuevosMes || 0,
            ratingPromedio: rating[0]?.ratingPromedio?.toFixed(1) || 0,
            productosStockBajo: lowStock[0]?.productosStockBajo || 0,
            citasHoyDetalle: citasHoyDetalle,
            barberosActivos: barberosActivos
        });

    } catch (error) {
        console.error('Error al obtener dashboard:', error);
        res.status(500).json({ message: 'Error interno al obtener el dashboard.' });
    }
});

export default router;