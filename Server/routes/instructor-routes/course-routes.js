const express = require('express');

const {
    addNewCourse,
    getAllCourse,
    getCourseDetailsByID,
    updateCourseByID,
}= require("../../controllers/instructor-controller/course-controller");

const router = express.Router();

router.post('/add', addNewCourse);
router.get('/get', getAllCourse);
router.get('/get/details/:id', getCourseDetailsByID);
router.put('/update/:id', updateCourseByID);

module.exports = router;
