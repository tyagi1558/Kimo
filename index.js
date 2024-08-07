// index.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses.route');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// MongoDB connection
// const mongoUri = process.env.MONGO_URI;
const mongoUri = 'mongodb+srv://Anmol908:anmol%40123@cluster0.dho9xwt.mongodb.net/kimo?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Use the routes
app.use('/api', courseRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
