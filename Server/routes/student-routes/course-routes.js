const express = require('express');
const {getAllStudentViewCourses, getAllStudentViewCoursesDetails} = require('../../controllers/student-controller/course-controller');
const router = express.Router();

router.get('/get', getAllStudentViewCourses);

module.exports = router;