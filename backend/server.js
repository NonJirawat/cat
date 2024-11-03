const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // นำเข้า CORS
const authRoutes = require('./auth');  // นำเข้าไฟล์ auth.js
const postRoutes = require('./post');  // นำเข้าไฟล์ posts.js
const friendRoutes = require('./friend');


const app = express();

// Middleware
app.use(cors());  // ใช้ CORS middleware สำหรับทุก request
app.use(bodyParser.json());  // แปลง request body ให้เป็น JSON

// Routes
app.use('/api/auth', authRoutes);  // เส้นทางสำหรับ auth
app.use('/api', postRoutes); 
app.use('/api', friendRoutes);

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});