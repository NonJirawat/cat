
const express = require('express');
const { getConnection } = require('./dbconfig');
const authMiddleware = require('./authMiddleware');  // นำเข้า authMiddleware จากไฟล์ auth.js
const router = express.Router();





// เพิ่มโพสต์ใหม่
router.post('/post', async (req, res) => {
  const { userId, content, image } = req.body;
  
  if (!userId || !content) {
    return res.status(400).json({ message: 'Please provide userId and content' });
  }
  
  try {
    const pool = await getConnection();
    await pool.request()
      .input('UserID', userId)
      .input('Content', content)
      .input('Image', image || null)  // อนุญาตให้ภาพเป็นค่าว่างได้
      .query('INSERT INTO Posts (UserID, Content, Image, CreatedAt, UpdatedAt) VALUES (@UserID, @Content, @Image, GETDATE(), GETDATE())');
      
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ดึงโพสต์ทั้งหมด
// ดึงโพสต์ทั้งหมด
router.get('/post', async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .query('SELECT p.PostID, p.Content, p.Image, p.CreatedAt, u.NameUser FROM Posts p JOIN Users u ON p.UserID = u.IDUser ORDER BY p.CreatedAt DESC');
      
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get('/user/posts', authMiddleware, async (req, res) => {
    const userId = req.user.userId;  // ใช้ userId จาก token ที่ถอดรหัส
  
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('UserID', userId)
        .query('SELECT PostID, Content, CreatedAt, UpdatedAt, Image FROM Posts WHERE UserID = @UserID ORDER BY CreatedAt DESC');
  
      res.json(result.recordset);  // ส่งข้อมูลโพสต์ของผู้ใช้กลับไปยัง frontend
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // ดึงรายละเอียดโพสต์ตาม ID (สำหรับโพสต์เฉพาะโพสต์เดียว)
  router.get('/posts/:id', authMiddleware, async (req, res) => {
    const postId = parseInt(req.params.id, 10);  // แปลง postId ให้เป็น int
  
    if (isNaN(postId)) {
      return res.status(400).json({ message: 'Invalid post ID' });
    }
  
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input('PostID', postId)
        .input('UserID', req.user.userId)  // ใช้ userId จาก token
        .query(`SELECT PostID, UserID, Content, CreatedAt, UpdatedAt, Image 
                FROM Posts 
                WHERE PostID = @PostID AND UserID = @UserID`);  // ตรวจสอบ PostID และ UserID พร้อมกัน
  
      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'Post not found or access denied' });
      }
  
      res.json(result.recordset[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // สมมุติว่าเรามี API สำหรับดึงข้อมูล posts พร้อมกับข้อมูล cats ที่สัมพันธ์กัน
router.get('/posts-with-cats', async (req, res) => {
  try {
      const pool = await getConnection();
      const result = await pool.request()
          .query(`
              SELECT 
                  p.PostID,
                  p.Content,
                  p.CreatedAt,
                  p.Image,
                  c.Breed,
                  c.Age,
                  c.Sex,
                  c.Location
              FROM Posts p
              LEFT JOIN Cats c ON p.UserID = c.UsersID
              ORDER BY p.CreatedAt DESC
          `);

      res.json(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

  
  
module.exports = router;
