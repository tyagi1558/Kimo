const express = require('express');
const router = express.Router();
const { fetchCourses, fetchChapter, fetchCourse , rateCourseChapter} = require('../controllers/courses.controller');

router.get('/courses', fetchCourses);
router.get('/courses/:id/chapters/:chapterId', fetchChapter);
router.get('/courses/:id', fetchCourse);
router.post('/courses/:id/chapters/:index/rate', rateCourseChapter);

module.exports = router;
