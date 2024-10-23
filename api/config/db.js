// api/config/db.js

const mysql = require('mysql2/promise');

async function initializeConnection() {
    try {
        const connection = await mysql.createPool({
            host: process.env.DB_HOST || 'db', // Gunakan 'db' sebagai host
            user: process.env.DB_USER || 'user',
            password: process.env.DB_PASSWORD || 'userpassword',
            database: process.env.DB_NAME || 'buku_tamu',
            waitForConnections: true,
            connectionLimit: 10, // Menggunakan connection pool
            queueLimit: 0
        });

        console.log('Connected to MySQL database');
        return connection;
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1); // Keluar jika koneksi gagal
    }
}

module.exports = initializeConnection();
