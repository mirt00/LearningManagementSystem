const express = require('express');
const {getAllStudentViewCourses, getAllStudentViewCoursesDetails, checkCoursePurchasedInfo} = require('../../controllers/student-controller/course-controller');
const router = express.Router();

router.get('/get', getAllStudentViewCourses);
router.get('/get/:details/:id/', getAllStudentViewCoursesDetails);
router.get("/purchase-info/details/:id/:studentId", checkCoursePurchasedInfo);

module.exports = router;