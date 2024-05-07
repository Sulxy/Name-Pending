const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/____'); // <--- Replace '____' with the name of your database

module.exports = mongoose.connection;
