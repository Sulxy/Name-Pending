require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Whisper';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(`Connected to MongoDB: ${mongoose.connection.host}`))
.catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;