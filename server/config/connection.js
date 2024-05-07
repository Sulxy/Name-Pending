const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Whisper';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(`Connected to MongoDB: ${mongoose.connection.host}`))
.catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;