const sql = require('mssql');


const config = {
    user: 'sa',  // ใส่ชื่อผู้ใช้ SQL Server
    password: '#Nnonwow12',  // ใส่รหัสผ่าน SQL Server
    server: 'LAPTOP-L0CV275L',  // ชื่อหรือ IP ของเซิร์ฟเวอร์
    database: 'UserDatabase',  // ชื่อฐานข้อมูล
    options: {
        encrypt: true,  // ใช้ encryption ถ้าจำเป็น
        trustServerCertificate: true  // สำหรับใบรับรอง SSL
    }
};

async function getConnection() {
    try {
        let pool = await sql.connect(config);
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

module.exports = { sql, getConnection };
