Course Management API
Overview
This project provides a RESTful API for managing courses and their chapters. Built using Node.js and Express, the API connects to a MongoDB database and supports CRUD operations for courses and chapters, including sorting and rating functionalities.

Features
Retrieve all courses with options to sort by name, date, or rating.
Get specific course details including chapters.
Fetch specific chapter information by course and chapter ID.
Rate chapters with positive or negative feedback.
Calculate and update total ratings for each course dynamically.
Technologies Used
Node.js: JavaScript runtime for building server-side applications.
Express: Web framework for building the RESTful API.
MongoDB: NoSQL database for storing course data.
Mongoose: ODM library for MongoDB and Node.js.
dotenv: Package for managing environment variables.
Getting Started
Prerequisites
Node.js and npm installed.
MongoDB Atlas account (or a local MongoDB instance).
Installation
Clone the repository:

1 git clone [<repository-url>](https://github.com/tyagi1558/Kimo)

Install the required dependencies:

npm install

Start the server:

npm run dev
The server will start on port 3000 by default. You can change this in the index.js file if needed.

API Endpoints
Retrieve All Courses
Endpoint: GET /api/courses
Query Parameters:
sort (optional): alphabetical, date, rating
domain (optional): Filter courses by domain
Get Specific Course Details
Endpoint: GET /api/courses/:id
URL Parameters:
id: Course ID
Get Specific Chapter Information
Endpoint: GET /api/courses/:id/chapters/:chapterId
URL Parameters:
id: Course ID
chapterId: Chapter index
Rate a Chapter
Endpoint: POST /api/courses/:id/chapters/:index/rate
URL Parameters:
id: Course ID
index: Chapter index
Request Body:
rating: positive or negative

Example Requests
Retrieve All Courses:

curl -X GET "http://localhost:3000/api/courses?sort=rating"

Get Specific Course Details:
curl -X GET "localhost:3000/api/courses/66b270f54e2a146245a97cf9"

Get Specific Chapter Information:

curl -X GET "http://localhost:3000/api/courses/64c7e0f1d6e9e2d6f41a6c56/chapters/0"

Rate a Chapter:

curl -X POST "http://localhost:3000/api/courses/66b270f54e2a146245a97cf9/chapters/5/rate" \
-H "Content-Type: application/json" \
-d '{"rating": "positive"}'

Error Handling
404 Not Found: Resource does not exist.
400 Bad Request: Invalid request parameters.
500 Internal Server Error: Server error.




