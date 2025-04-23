const Course = require('../../models/Course');


const getAllStudentViewCourses = async (req, res) => {
    try {
        const {category=[], level=[],primaryLanguage=[],sortBY="price-lowtohigh"} = req.query;
        let filters = {};
        if (category.length) {
            filters.category = { $in: category.split(',') };
        }
        if (level.length) {
            filters.level = { $in: level.split(',') };
        }
        if (primaryLanguage.length) {
            filters.primaryLanguage = { $in: primaryLanguage.split(',') };
        }
        let sort = {};
        switch (sortBY) { 
            case "price-lowtohigh":
                sort = { Pricing: 1 };
                break;
            case "price-hightolow":
                sort = { Pricing: -1 };
                break;
            case "title-ztoa":
                sort = { title: -1 };
                break;
            case "title-atoz":
                sort = { title: 1 };
                break;
            default:
                sort = { date: -1 };
        }
        const courseslist = await Course.find(filters).sort(sort);
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
