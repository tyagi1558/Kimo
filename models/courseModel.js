// models/courseModel.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  date: Number,
  description: String,
  domain: [String],
  chapters: [
    {
      name: String,
      text: String,
      positiveRatings: { type: Number, default: 0 },
      negativeRatings: { type: Number, default: 0 },
    },
  ],
  totalRatings: { type: Number, default: 0 }
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
