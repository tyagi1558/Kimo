const Course = require('../models/courseModel');

const getCoursesWithFilterAndSort = async (filter, sortOption) => {
  return await Course.find(filter).sort(sortOption);
};

const updateCourseRatings = async (courses) => {
  courses.forEach(course => {
    course.totalRatings = course.chapters.reduce((acc, chapter) => {
      return acc + chapter.positiveRatings - chapter.negativeRatings;
    }, 0);
  });
  
  await Promise.all(courses.map(course => course.save()));
};

const getCourseById = async (id) => {
  return await Course.findById(id);
};

const saveCourse = async (course) => {
  return await course.save();
};


module.exports = { getCoursesWithFilterAndSort, updateCourseRatings ,getCourseById, saveCourse};
