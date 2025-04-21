const Course = require('../../models/Course');


const getAllStudentViewCourses = async (req, res) => {
    try {
        const coursesList = await Course.find({})
            if(coursesList.length === 0){
                return res.status(404).json({
                    success: false,
                    message: 'No courses found',
                    data: []
                })
    }
        res.status(200).json({
        success: true,
        message: 'Courses fetched successfully',
        data: coursesList,
    })
} catch (e) {
    console.log(e);
    res.status(500).json({
        success: false,
        message: 'Error fetching courses'
    })
}
}


const getAllStudentViewCoursesDetails = async (req, res) => {
    try {

        const {id}= req.params;
        const courseDetails = await Course.findById(id);
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: 'Course not found',
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: 'Course details found successfully',
            data: courseDetails,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Error fetching courses'
        })
    }
};
module.exports = {
    getAllStudentViewCourses,
    getAllStudentViewCoursesDetails
};
