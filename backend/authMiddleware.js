const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // เปลี่ยนเป็น secret key ของคุณ

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // ตั้งค่า req.user ด้วยข้อมูลที่ถอดรหัสจาก token
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
