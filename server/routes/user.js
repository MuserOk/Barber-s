// server/routes/user.js

import express from 'express';
import pool from '../config/db.js'; 
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware para verificar el JWT (Protección de Rutas)
const protect = (req, res, next) => {
    const token = req.cookies.hs_token; // Leer la cookie

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no encontrado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adjuntar el payload del token a la petición
        next();
    } catch (error) {
        res.clearCookie('hs_token');
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

// [GET] /api/user/tendencias - Obtener todas las tendencias
router.get('/tendencias', async (req, res) => {
    try {
        const [tendencias] = await pool.query('SELECT id_tendencia, nombre, imagen_url FROM tendencias WHERE activo = TRUE');
        res.status(200).json(tendencias);
    } catch (error) {
        console.error('Error al obtener tendencias:', error);
        res.status(500).json({ message: 'Error interno al obtener tendencias.' });
    }
});

// [GET] /api/user/perfil - Obtener el perfil del usuario logueado
router.get('/perfil', protect, async (req, res) => {
    const userId = req.user.id; // ID del usuario obtenido del token

    try {
        // Obtener datos básicos del usuario
        const [users] = await pool.query('SELECT id_usuario, nombre_completo, edad, email, telefono, puntos_fidelidad, miembro_desde, id_rol FROM usuarios WHERE id_usuario = ?', [userId]);
        const user = users[0];

        if (!user) {
            return res.status(404).json({ message: 'Perfil de usuario no encontrado.' });
        }

        // Si es barbero, obtener detalles adicionales
        if (user.id_rol === 2) {
            const [barberDetails] = await pool.query('SELECT especialidad, experiencia_anios, biografia, horario_laboral, rating_promedio FROM barberos_detalles WHERE id_barbero = ?', [userId]);
            user.barberDetails = barberDetails[0] || {};
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ message: 'Error interno al obtener el perfil.' });
    }
});


// [PUT] /api/user/perfil - Actualizar datos del perfil del usuario logueado
router.put('/perfil', protect, async (req, res) => {
    const userId = req.user.id; // ID del usuario obtenido del token
    const { 
        nombre_completo, 
        email, 
        telefono, 
        edad,
        especialidad, 
        experiencia_anios, 
        biografia,
        horario_laboral
        // Agrega aquí todas las propiedades que envías desde el frontend
    } = req.body;

    // **CORRECCIÓN CRÍTICA:** Asegurar que experiencia_anios sea un número o NULL
    const experienciaAniosDB = parseInt(experiencia_anios, 10);
    // Si la conversión falla (ej: si es '8 años' o '') será NaN. 
    // Usamos un operador ternario para manejar esto.
    const finalExperienciaAnios = isNaN(experienciaAniosDB) || experiencia_anios === '' ? null : experienciaAniosDB;


    let connection; // Usar una conexión para transacciones si es necesario, o pools.query si son separadas.
    try {
        // 1. Actualizar tabla USUARIOS (Asume que 'nombre' en el frontend es 'nombre_completo' en DB)
        await pool.query(
            'UPDATE usuarios SET nombre_completo = ?, email = ?, telefono = ?, edad = ? WHERE id_usuario = ?',
            [nombre_completo, email, telefono, edad, userId]
        );

        // 2. Si el usuario es Barbero (Rol 2, lo sabemos por el flujo de BarberPage)
        // Actualizar tabla BARBEROS_DETALLES
        // IMPORTANTE: Este update solo funciona si existe una fila en BARBEROS_DETALLES.
        const [barberResult] = await pool.query(
            'UPDATE barberos_detalles SET especialidad = ?, experiencia_anios = ?, biografia = ?, horario_laboral = ? WHERE id_barbero = ?',
            [especialidad, finalExperienciaAnios, biografia, horario_laboral, userId]
        );

        // Opcional: Si el barbero no existía en detalles (0 filas afectadas), podrías hacer un INSERT aquí.
        // if (barberResult.affectedRows === 0) { ... INSERT INTO BARBEROS_DETALLES ... }

        res.status(200).json({ message: 'Perfil actualizado exitosamente.' });

    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({ message: 'Error interno al actualizar el perfil.' });
    }
});



// [GET] /api/user/servicios - Obtener todos los servicios
router.get('/servicios', async (req, res) => {
    try {
        const [servicios] = await pool.query('SELECT id_servicio, nombre, precio, duracion_minutos FROM servicios');
        res.status(200).json(servicios);
    } catch (error) {
        console.error('Error al obtener servicios:', error);
        res.status(500).json({ message: 'Error interno al obtener servicios.' });
    }
});


// [GET] /api/user/barberos - Obtener todos los barberos
router.get('/barberos', async (req, res) => {
    try {
        const [barberos] = await pool.query(
            `SELECT u.id_usuario AS id_barbero, u.nombre_completo, bd.especialidad 
             FROM usuarios u
             JOIN barberos_detalles bd ON u.id_usuario = bd.id_barbero
             WHERE u.id_rol = 2` // Asumiendo que el rol 2 es 'barbero'
        );
        res.status(200).json(barberos);
        
    } catch (error) {
        console.error('Error al obtener barberos:', error);
        res.status(500).json({ message: 'Error interno al obtener barberos.' });
    }
});


// [GET] /api/user/comments - Obtener los últimos 3 comentarios/reseñas
router.get('/comments', async (req, res) => {
    try {
        // Obtener los últimos 3 comentarios con el nombre del cliente
        const [comments] = await pool.query(
            `SELECT 
                c.texto_comentario AS text, 
                u.nombre_completo AS name,
                u.foto_perfil_url AS photo
             FROM comentarios_reviews c
             JOIN usuarios u ON c.id_cliente = u.id_usuario
             ORDER BY c.fecha_creacion DESC
             LIMIT 5`
        );
        
        // Si no hay foto, usar un placeholder
        const finalComments = comments.map(c => ({
            ...c,
            photo: c.photo || 'https://modaellos.com/wp-content/uploads/2019/01/cortes-de-pelo-para-cara-redonda-2020-para-hombres-corte-clasico-FOTOS-zac-efron.jpg' // actor
        }));

        res.status(200).json(finalComments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error interno al obtener comentarios.' });
    }
});


// [GET] /api/user/historial - Obtener el historial de turnos completados del cliente logueado
router.get('/historial', protect, async (req, res) => {
    const id_cliente = req.user.id;

    try {
        // 1. Obtener todos los turnos completados del cliente
        const [turnos] = await pool.query(
            `SELECT 
                t.id_turno AS id,
                t.fecha_hora_inicio AS fecha,
                t.precio_final AS precio,
                t.rating_cliente AS rating,
                t.notas_barbero AS notas,
                s.nombre AS servicio,
                u.nombre_completo AS barbero
             FROM turnos t
             JOIN servicios s ON t.id_servicio = s.id_servicio
             JOIN usuarios u ON t.id_barbero = u.id_usuario
             WHERE t.id_cliente = ? AND t.estado = 'Completado'
             ORDER BY t.fecha_hora_inicio DESC`,
            [id_cliente]
        );

        // 2. Obtener las fotos para todos los turnos (en una sola consulta eficiente)
        const turnoIds = turnos.map(t => t.id);
        let fotos = [];
        if (turnoIds.length > 0) {
            [fotos] = await pool.query(
                `SELECT id_turno, url_foto 
                 FROM fotos_turnos 
                 WHERE id_turno IN (?)`,
                [turnoIds]
            );
        }

        // 3. Mapear las fotos a sus respectivos turnos
        const historialConFotos = turnos.map(turno => ({
            ...turno,
            // Agrupar las URLs de las fotos en un array para cada turno
            fotos: fotos.filter(f => f.id_turno === turno.id).map(f => f.url_foto)
        }));

        res.status(200).json(historialConFotos);

    } catch (error) {
        console.error('Error al obtener historial:', error);
        res.status(500).json({ message: 'Error interno al obtener el historial.' });
    }
});

 

export default router;