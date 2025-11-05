// server/routes/auth.js

import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js'; // El pool de conexión a MySQL
import jwt from 'jsonwebtoken';

const router = express.Router();

// [POST] /api/auth/register - Ruta para el registro de nuevos usuarios
router.post('/register', async(req, res) => {
    // 1. Obtener datos del cuerpo de la petición (enviados desde RegUser.jsx)
    const { nombre, email, password, telefono} = req.body;  //QUITAR LUEGO ADMIN KEY

    // 2. Validación básica
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Faltan campos obligatorios: nombre, email y contraseña.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // 3. Verificar si el usuario ya existe
        const [existingUser] = await connection.query('SELECT id_usuario FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }

        // 4. Hashear la contraseña
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 5. Obtener el ID del rol 'cliente' (asumiendo que lo insertaste como ID 3)
        const [roleResult] = await connection.query('SELECT id_rol FROM roles WHERE nombre_rol = ?', ['cliente']);
        const id_rol = roleResult.length > 0 ? roleResult[0].id_rol : undefined;


        if (!id_rol) {
            return res.status(500).json({ message: 'Error de configuración: Rol "cliente" no encontrado.' });
        }

        // 6. Insertar el nuevo usuario
        const insertQuery = `
            INSERT INTO usuarios 
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

        // Buscar el usuario por email
        const [users] = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Generar el JWT
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está configurado en el entorno.");
        }


        // Generar el JWT (JSON Web Token)
        // **IMPORTANTE:** Define una clave secreta en tu .env
        const token = jwt.sign({ id: user.id_usuario, rol: user.id_rol },
            process.env.JWT_SECRET, // Usa una clave secreta fuerte
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        // Establecer la cookie HTTP-ONLY
        res.cookie('hs_token', token, {
            httpOnly: true, // No accesible por JavaScript (protección XSS)
            secure: process.env.NODE_ENV === 'production', // Solo enviar sobre HTTPS en producción
            sameSite: 'Lax', // Protección CSRF
            maxAge: 3600000 // 1 hora (en milisegundos)
        });


        // Respuesta exitosa: Envía el token y los datos básicos del usuario
        res.status(200).json({
            message: 'Login exitoso',
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

// [GET] /api/auth/check-session - Ruta para verificar la cookie y obtener datos del usuario
router.get('/check-session', async (req, res) => {
    const token = req.cookies.hs_token; // Leer la cookie

    if (!token) {
        return res.status(401).json({ message: 'No autenticado.' });
    }

    try {
        // 1. Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 2. Buscar los datos del usuario (opcional, pero recomendado)
        const [users] = await pool.query('SELECT id_usuario, nombre_completo, email, id_rol FROM usuarios WHERE id_usuario = ?', [decoded.id]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado.' });
        }

        // 3. Devolver los datos del usuario
        res.status(200).json({
            user: {
                id: user.id_usuario,
                nombre: user.nombre_completo,
                email: user.email,
                rolId: user.id_rol
            }
        });

    } catch (error) {
        // Si el token es inválido o expiró
        res.clearCookie('hs_token'); // Limpiar la cookie inválida
        res.status(401).json({ message: 'Sesión expirada o inválida.' });
    }
});

// [POST] /api/auth/logout - Ruta para cerrar sesión
router.post('/logout', (req, res) => {
    res.clearCookie('hs_token'); // Eliminar la cookie
    res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
});

// [POST] /api/auth/request-password-reset - Paso 1: Solicitar código
router.post('/request-password-reset', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'El email es obligatorio.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // 1. Verificar que el usuario exista
        const [users] = await connection.query('SELECT id_usuario FROM usuarios WHERE email = ?', [email]);
        if (users.length === 0) {
            // Por seguridad, respondemos éxito incluso si el email no existe
            // para no dar pistas sobre qué emails están registrados.
            return res.status(200).json({ message: 'Si el email existe, se ha enviado un código.' });
        }

        // 2. Generar código de 6 dígitos
        const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. Guardar el código en la base de datos
        await connection.query('UPDATE usuarios SET codigo_recuperacion = ? WHERE email = ?', [recoveryCode, email]);

        // 4. Simular el envío del código por email (En un proyecto real, usarías Nodemailer)
        console.log(`[EMAIL SIMULADO] Código de recuperación para ${email}: ${recoveryCode}`);

        res.status(200).json({ message: 'Código de recuperación enviado.' });

    } catch (error) {
        console.error('Error en solicitud de código:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    } finally {
        if (connection) connection.release();
    }
});

// [POST] /api/auth/verify-code - Paso 2: Verificar código
router.post('/verify-code', async (req, res) => {
    const { email, recoveryCode } = req.body;

    if (!email || !recoveryCode) {
        return res.status(400).json({ message: 'Faltan email y código.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // 1. Buscar el usuario por email y código
        const [users] = await connection.query(
            'SELECT id_usuario FROM usuarios WHERE email = ? AND codigo_recuperacion = ?', 
            [email, recoveryCode]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Código inválido o email incorrecto.' });
        }

        // 2. Si es correcto, devolver éxito
        res.status(200).json({ message: 'Código verificado exitosamente.' });

    } catch (error) {
        console.error('Error en verificación de código:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    } finally {
        if (connection) connection.release();
    }
});

// [POST] /api/auth/reset-password - Paso 3: Restablecer contraseña
router.post('/reset-password', async (req, res) => {
    const { email, recoveryCode, newPassword } = req.body;

    if (!email || !recoveryCode || !newPassword) {
        return res.status(400).json({ message: 'Faltan datos para restablecer la contraseña.' });
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // 1. Verificar que el código sea correcto (doble verificación)
        const [users] = await connection.query(
            'SELECT id_usuario FROM usuarios WHERE email = ? AND codigo_recuperacion = ?', 
            [email, recoveryCode]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Verificación fallida. Intenta de nuevo.' });
        }

        // 2. Hashear la nueva contraseña
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);

        // 3. Actualizar la contraseña y limpiar el código de recuperación
        await connection.query(
            'UPDATE usuarios SET password_hash = ?, codigo_recuperacion = NULL WHERE email = ?', 
            [passwordHash, email]
        );

        res.status(200).json({ message: 'Contraseña actualizada correctamente.' });

    } catch (error) {
        console.error('Error al restablecer contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    } finally {
        if (connection) connection.release();
    }
});


export default router;