const express = require('express');
const router = express.Router();
const { getConnection } = require('./dbconfig');
const authMiddleware = require('./authMiddleware');


// ส่งคำขอเป็นเพื่อน
router.post('/request', authMiddleware, async (req, res) => {
    const requesterUserId = req.user.userId;
    const { receiverUserId } = req.body;
  
    try {
      const pool = await getConnection();
      await pool.request()
        .input('RequesterUserID', requesterUserId)
        .input('ReceiverUserID', receiverUserId)
        .input('Status', 'pending')
        .query('INSERT INTO FriendRequests (RequesterUserID, ReceiverUserID, Status) VALUES (@RequesterUserID, @ReceiverUserID, @Status)');
        
      res.status(201).json({ message: 'Friend request sent successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// ยอมรับคำขอเป็นเพื่อน
router.put('/accept', async (req, res) => {
  const { requestId } = req.body;

  try {
    const pool = await getConnection();
    // อัปเดตสถานะคำขอเป็น 'accepted'
    await pool.request()
      .input('RequestID', requestId)
      .input('Status', 'accepted')
      .query('UPDATE FriendRequests SET Status = @Status WHERE RequestID = @RequestID');

    // เพิ่มความสัมพันธ์ในตาราง Friends
    const request = await pool.request()
      .input('RequestID', requestId)
      .query('SELECT RequesterUserID, ReceiverUserID FROM FriendRequests WHERE RequestID = @RequestID');
    
    const { RequesterUserID, ReceiverUserID } = request.recordset[0];

    await pool.request()
      .input('UserID1', RequesterUserID)
      .input('UserID2', ReceiverUserID)
      .query('INSERT INTO Friends (UserID1, UserID2) VALUES (@UserID1, @UserID2)');
    
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ปฏิเสธคำขอเป็นเพื่อน
router.put('/decline', async (req, res) => {
  const { requestId } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input('RequestID', requestId)
      .input('Status', 'declined')
      .query('UPDATE FriendRequests SET Status = @Status WHERE RequestID = @RequestID');
      
    res.status(200).json({ message: 'Friend request declined' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ดึงรายชื่อเพื่อนของผู้ใช้
router.get('/friends/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('UserID', userId)
      .query(`SELECT UserID2 AS FriendID FROM Friends WHERE UserID1 = @UserID
              UNION
              SELECT UserID1 AS FriendID FROM Friends WHERE UserID2 = @UserID`);
    
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ดึงคำขอที่สถานะเป็น 'pending'
// ดึงคำขอที่สถานะเป็น 'pending' และผู้ใช้เป็นผู้รับคำขอ
router.get('/requests/pending', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('ReceiverUserID', userId)
      .query(`
        SELECT 
          FriendRequests.RequestID, 
          FriendRequests.RequesterUserID, 
          FriendRequests.ReceiverUserID, 
          FriendRequests.Status,
          Users.NameUser AS RequesterName
        FROM 
          FriendRequests
        JOIN 
          Users ON FriendRequests.RequesterUserID = Users.IDUser
        WHERE 
          FriendRequests.ReceiverUserID = @ReceiverUserID 
          AND FriendRequests.Status = 'pending'
      `);
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error retrieving pending requests:', err);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;


module.exports = router;
