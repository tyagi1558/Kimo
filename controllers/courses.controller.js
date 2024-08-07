const { getCourses, getChapterInfo, getCourse, rateChapter } = require('../services/courses.service');

const fetchCourses = async (req, res) => {
  const { sort, domain } = req.query;
  let sortOption = {};
  
  if (sort === 'alphabetical') {
    sortOption = { name: 1 };
  } else if (sort === 'date') {
    sortOption = { date: -1 };
  } else if (sort === 'rating') {
    sortOption = { totalRatings: -1 };
  }
  
  let filter = {};
  if (domain) {
    filter.domain = domain;
  }
  
  try {
    const courses = await getCourses(filter, sortOption);
    const sortedCourses = courses.sort((a, b) => {
      if (sortOption.name) {
        return a.name.localeCompare(b.name);
      } else if (sortOption.date) {
        return b.date - a.date;
      } else if (sortOption.totalRatings) {
        return b.totalRatings - a.totalRatings;
      }
      return 0;
    });
    
    res.json(sortedCourses);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Endpoint to get specific chapter information

const fetchChapter = async (req, res) => {
  const { id, chapterId } = req.params;

  try {
    console.log(`Fetching chapter ${chapterId} for course ${id}`);
    const chapter = await getChapterInfo(id, parseInt(chapterId, 10));
    res.json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error);
    if (error.message === "Course not found" || error.message === "Chapter not found") {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};


// Endpoint to get the course overview

const fetchCourse = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Fetching course with ID ${id}`);
    const course = await getCourse(id);
    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    if (error.message === "Course not found") {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

const rateCourseChapter = async (req, res) => {
  const { id, index } = req.params;
  const { rating } = req.body;

  try {
    console.log(`Rating chapter at index ${index} for course ${id} with rating: ${rating}`);
    const chapter = await rateChapter(id, parseInt(index), rating);
    res.json({ message: "Chapter rated successfully", chapter });
  } catch (error) {
    console.error("Error rating chapter:", error);
    if (error.message === "Course not found" || error.message === "Chapter not found") {
      res.status(404).send(error.message);
    } else if (error.message === "Invalid rating type") {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = { fetchCourses , fetchChapter, fetchCourse, rateCourseChapter};
