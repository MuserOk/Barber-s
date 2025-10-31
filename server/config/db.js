// server/config/db.js

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Crea un pool de conexiones para manejar múltiples peticiones eficientemente
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones simultáneas
    queueLimit: 0
});

// Función de prueba para verificar la conexión al iniciar el servidor
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a MySQL exitosa!');
        connection.release(); // Libera la conexión
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
        // Opcional: Terminar el proceso si la conexión falla
        // process.exit(1); 
    }
}

testConnection();

export default pool;