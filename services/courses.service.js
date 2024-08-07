const { getCoursesWithFilterAndSort, updateCourseRatings, getCourseById, saveCourse } = require('../dao/courses.dao');

const getCourses = async (filter, sortOption) => {
  const courses = await getCoursesWithFilterAndSort(filter, sortOption);
  await updateCourseRatings(courses);
  return courses;
};


const getChapterInfo = async (courseId, chapterIndex) => {
  const course = await getCourseById(courseId);
  
  if (!course) {
    throw new Error("Course not found");
  }
  
  if (chapterIndex < 0 || chapterIndex >= course.chapters.length) {
    throw new Error("Chapter not found");
  }

  
  return course.chapters[chapterIndex];
};



const getCourse = async (id) => {
  const course = await getCourseById(id);
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};



const rateChapter = async (id, index, rating) => {
  const course = await getCourseById(id);
  if (!course) {
    throw new Error("Course not found");
  }

  if (index < 0 || index >= course.chapters.length) {
    throw new Error("Chapter not found");
  }

  const chapter = course.chapters[index];

  if (rating === "positive") {
    chapter.positiveRatings += 1;
  } else if (rating === "negative") {
    chapter.negativeRatings += 1;
  } else {
    throw new Error("Invalid rating type");
  }

  course.totalRatings = course.chapters.reduce((acc, chapter) => {
    return acc + chapter.positiveRatings - chapter.negativeRatings;
  }, 0);

  await saveCourse(course);
  return chapter;
};

module.exports = { getCourses, getChapterInfo, getCourse , rateChapter};
