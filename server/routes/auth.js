// server/routes/auth.js

import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js'; // El pool de conexión a MySQL
import jwt from 'jsonwebtoken';

const router = express.Router();

// [POST] /api/auth/register - Ruta para el registro de nuevos usuarios
router.post('/register', async(req, res) => {
    // 1. Obtener datos del cuerpo de la petición (enviados desde RegUser.jsx)
    const { nombre, email, password, telefono } = req.body;

    // 2. Validación básica
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Faltan campos obligatorios: nombre, email y contraseña.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // 3. Verificar si el usuario ya existe
        const [existingUser] = await connection.query('SELECT id_usuario FROM USUARIOS WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }

        // 4. Hashear la contraseña
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 5. Obtener el ID del rol 'cliente' (asumiendo que lo insertaste como ID 3)
        const [roleResult] = await connection.query('SELECT id_rol FROM ROLES WHERE nombre_rol = ?', ['cliente']);
        const id_rol = roleResult.length > 0 ? roleResult[0].id_rol : undefined;


        if (!id_rol) {
            return res.status(500).json({ message: 'Error de configuración: Rol "cliente" no encontrado.' });
        }

        // 6. Insertar el nuevo usuario
        const insertQuery = `
            INSERT INTO USUARIOS 
            (id_rol, nombre_completo, email, password_hash, telefono) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await connection.query(insertQuery, [
            id_rol,
            nombre,
            email,
            passwordHash,
            telefono || null // Usa null si el teléfono no se proporciona
        ]);

        // 7. Respuesta exitosa
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Error en el registro de usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    } finally {
        if (connection) connection.release(); // Siempre libera la conexión
    }
});



// [POST] /api/auth/login - Ruta para iniciar sesión
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan credenciales.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // 1. Buscar el usuario por email
        const [users] = await connection.query('SELECT * FROM USUARIOS WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // 2. Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // 3. Generar el JWT (JSON Web Token)
        // **IMPORTANTE:** Define una clave secreta en tu .env
        const token = jwt.sign({ id: user.id_usuario, rol: user.id_rol },
            process.env.JWT_SECRET, // Usa una clave secreta fuerte
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        // 4. Respuesta exitosa: Envía el token y los datos básicos del usuario
        res.status(200).json({
            message: 'Login exitoso',
            token,
            user: {
                id: user.id_usuario,
                nombre: user.nombre_completo,
                email: user.email,
                rolId: user.id_rol
            }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    } finally {
        if (connection) connection.release();
    }
});


export default router;