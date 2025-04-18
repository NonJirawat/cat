const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const token = authHeader.split(' ')[1];  // แยก Bearer และ Token ออกจากกัน
        const decoded = jwt.verify(token, JWT_SECRET);  // ถอดรหัส token ด้วย secret key
        req.user = decoded;  // เก็บข้อมูลผู้ใช้ใน req.user
        next();  // ดำเนินการต่อไป
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = authMiddleware;
