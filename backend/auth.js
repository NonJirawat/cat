// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { getConnection } = require('./dbconfig');
const router = express.Router();
const JWT_SECRET = 'your_secret_key';

// เส้นทางสำหรับ Login
// เส้นทางสำหรับ Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;  // รับ email และ password จาก body ของ request

  // ตรวจสอบว่ามีการส่ง email และ password มาหรือไม่
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const pool = await getConnection();  // เชื่อมต่อกับฐานข้อมูล
    const result = await pool.request()
      .input('Email', email)
      .query('SELECT * FROM Users WHERE Email = @Email');  // ค้นหาผู้ใช้ตาม email

    const user = result.recordset[0];  // ดึงผู้ใช้จากผลลัพธ์

    if (!user || user.Password !== password) {  // ถ้าไม่มีผู้ใช้หรือรหัสผ่านไม่ตรง
      return res.status(401).json({ message: 'Invalid credentials' });  // ส่งสถานะ 401 Unauthorized
    }

    // สร้าง JWT token ถ้ารหัสผ่านถูกต้อง
    const token = jwt.sign({ userId: user.IDUser, email: user.Email }, JWT_SECRET, { expiresIn: '1h' });
    // ส่ง token และข้อมูลผู้ใช้กลับไปยัง frontend
    res.json({ token, user: { id: user.IDUser, name: user.NameUser, email: user.Email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });  // ถ้ามีปัญหาในเซิร์ฟเวอร์
  }
});
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // ตรวจสอบว่ามีข้อมูลครบถ้วน
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    const pool = await getConnection();

    // ตรวจสอบว่ามีผู้ใช้อีเมลนี้แล้วหรือไม่
    const result = await pool.request()
      .input('Email', email)
      .query('SELECT * FROM Users WHERE Email = @Email');

    if (result.recordset.length > 0) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // บันทึกผู้ใช้ใหม่ลงในฐานข้อมูล
    await pool.request()
      .input('NameUser', name)
      .input('Email', email)
      .input('Password', password)  // บันทึกรหัสผ่านโดยตรง
      .query('INSERT INTO Users (NameUser, Email, Password, CreatedAt, UpdatedAt) VALUES (@NameUser, @Email, @Password, GETDATE(), GETDATE())');

    // ดึงข้อมูลผู้ใช้ใหม่
    const newUserResult = await pool.request()
      .input('Email', email)
      .query('SELECT * FROM Users WHERE Email = @Email');
    
    const newUser = newUserResult.recordset[0];

    // สร้าง JWT token
    const token = jwt.sign({ userId: newUser.IDUser, email: newUser.Email }, JWT_SECRET, { expiresIn: '1h' });

    // ส่งข้อมูลผู้ใช้กลับไปที่ frontend
    res.status(201).json({
      token,
      user: {
        id: newUser.IDUser,
        name: newUser.NameUser,
        email: newUser.Email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
