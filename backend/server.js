require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/auth');
const leaveRouter = require('./routers/leave');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/leave', leaveRouter);


// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mongo URI:', process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
    app.listen(4040, () => console.log('🚀 Server running on port 4040'));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
