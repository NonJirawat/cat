const express = require('express');
const router = express.Router();
const { getConnection } = require('./dbconfig');

// เพิ่มโพสต์ใหม่
router.post('/posts', async (req, res) => {
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
router.get('/posts', async (req, res) => {
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

module.exports = router;
