const mysql = require('mysql2/promise');
require('dotenv').config();

// แก้ไขค่าการเชื่อมต่อเป็นสำหรับ Docker Local
const pool = mysql.createPool({
    host: 'db',             // ชื่อ Service ใน docker-compose
    user: 'root',           // User มาตรฐานของ Docker MySQL
    password: 'root',       // Password ที่ตั้งไว้ใน docker-compose
    database: 'likitfah_db', // ชื่อฐานข้อมูลในเครื่อง
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;