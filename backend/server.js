const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');  
const authRoutes = require('./auth');  
const postRoutes = require('./post');  
const friendRoutes = require('./friend');
const matchingRoutes = require('./matching');
const combinedDataRouter = require('./combinedData');


// Middleware
app.use(cors());  
app.use(bodyParser.json()); 

// Routes
app.use('/api/auth', authRoutes);  
app.use('/api', postRoutes); 
app.use('/api', friendRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api', combinedDataRouter);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});