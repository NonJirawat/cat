const express = require('express');
const router = express.Router();
const { getConnection } = require('./dbconfig');
const authMiddleware = require('./authMiddleware');

router.get('/cats', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Cats');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ฟังก์ชันสำหรับจับคู่ตามพันธุ์ เพศ และช่วงอายุ
router.get('/match', authMiddleware, async (req, res) => {
  try {
    const pool = await getConnection();
    const userId = req.user.userId; // ใช้ userId จาก token ที่ authMiddleware ดึงมาได้

    // ดึงข้อมูลการตั้งค่าของผู้ใช้เฉพาะคนที่ล็อกอินอยู่
    const userPreferences = await pool.request()
      .input('userId', userId)
      .query(`
        SELECT 
            u.IDUser AS userId,
            u.NameUser AS userName,
            p.PreferenceBreed AS breed,
            p.PreferenceGender AS gender,
            p.AgeRangeStart AS ageStart,
            p.AgeRangeEnd AS ageEnd
        FROM 
            Users u
        JOIN 
            UserPreferences p ON u.IDUser = p.UserID
        WHERE 
            u.IDUser = @userId
      `);

    const user = userPreferences.recordset[0];

    if (!user) {
      return res.status(404).json({ message: 'User preferences not found' });
    }

    const matchedCats = await pool.request()
      .input('breed', user.breed)
      .input('gender', user.gender)
      .input('ageStart', user.ageStart)
      .input('ageEnd', user.ageEnd)
      .query(`
          SELECT 
              c.CatID AS catId,
              c.Name AS catName,
              c.Breed AS breed,
              c.sex AS gender,
              c.Age AS age,
              c.Image AS image
          FROM 
              Cats c
          WHERE 
              c.Breed = @breed 
              AND c.sex = @gender 
              AND CAST(PARSENAME(REPLACE(c.Age, ' years', ''), 1) AS INT) BETWEEN @ageStart AND @ageEnd
      `);

    res.json({
      userId: user.userId,
      userName: user.userName,
      preferences: {
        breed: user.breed,
        gender: user.gender,
        ageRangeStart: user.ageStart,
        ageRangeEnd: user.ageEnd,
      },
      matchedCats: matchedCats.recordset,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/matching/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const pool = await getConnection();
    const userPreferences = await pool.request()
      .input('userId', userId)
      .query(`
        SELECT 
          p.PreferenceBreed AS breed,
          p.PreferenceGender AS gender,
          p.AgeRangeStart AS ageStart,
          p.AgeRangeEnd AS ageEnd
        FROM UserPreferences p
        WHERE p.UserID = @userId
      `);

    if (userPreferences.recordset.length === 0) {
      return res.status(404).json({ message: "ไม่มีการจับคู่ที่ตรงกับเงื่อนไขของคุณในขณะนี้" });
    }

    const user = userPreferences.recordset[0];

    const matchedCats = await pool.request()
      .input('breed', user.breed)
      .input('gender', user.gender)
      .input('ageStart', user.ageStart)
      .input('ageEnd', user.ageEnd)
      .query(`
        SELECT 
          c.CatID AS catId,
          c.Name AS catName,
          c.Breed AS breed,
          c.sex AS gender,
          c.Age AS age,
          c.Image AS image
        FROM Cats c
        WHERE 
          c.Breed = @breed 
          AND c.sex = @gender 
          AND CAST(PARSENAME(REPLACE(c.Age, ' years', ''), 1) AS INT) BETWEEN @ageStart AND @ageEnd
      `);

    res.json({
      userId: userId,
      matchedCats: matchedCats.recordset
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


