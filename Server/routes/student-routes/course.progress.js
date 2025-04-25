
const express = require('express');
const router = express.Router();
const { markLectureAsViewed, getCurrentCourseProgress, resetCurrentProgress } = require('../../controllers/student-controller/course-progress-controller');


router.get('/get/:userId/:courseId', getCurrentCourseProgress); 
router.post('/mark-lecture-viewed', markLectureAsViewed);
router.post('/reset-course-progress', resetCurrentProgress);

module.exports = router;
