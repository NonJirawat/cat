const express = require('express');
const router = express.Router();
const { getConnection } = require('./dbconfig');

router.get('/combinedData', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        Users.IDUser, 
        Users.NameUser, 
        Cats.CatID, 
        Cats.Name, 
        Cats.Breed, 
        Cats.sex, 
        Cats.Age, 
        Cats.Location, 
        Cats.Image, 
        Posts.PostID, 
        Posts.Content, 
        Posts.contentmore, 
        Posts.CreatedAt, 
        Posts.UpdatedAt, 
        Posts.Image AS PostImage
      FROM 
        Users
      JOIN 
        Posts ON Users.IDUser = Posts.UserID
      JOIN 
        Cats ON Users.IDUser = Cats.UsersID
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
