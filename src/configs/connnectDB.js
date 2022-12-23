// get the client
import mysql from 'mysql2/promise';

console.log("Creating connnection pool ...")

// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'magento2',
    password : 'admin123',
    port: '3306',
    database: 'nodejsbasic'
});

export default pool;
