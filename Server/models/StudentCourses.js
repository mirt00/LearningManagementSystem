const mongoose = require('mongoose');
const StudentCoursesSchema = new mongoose.Schema({
   userId: String,
   course: [
    {
        courseId: String,
        title: String,
        instructorId: String,
        instructorName: String,
        dateOfPurchase: Date,
        courseImage: String,
    }
   ]
});
module.exports = mongoose.model('StudentCourses', StudentCoursesSchema);