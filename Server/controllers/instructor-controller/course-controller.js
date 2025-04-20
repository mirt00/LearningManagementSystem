const Course = require('../../models/Course')


const addNewCourse = async(req, res)=>{
    try {
        const courseData = req.body;
        const newlyCreatedCourse = new Course(courseData);
        const saveCourse = await newlyCreatedCourse.save();

        if(saveCourse){
            res.status(201).json({
                success: true,
                message: "Course saved successfully",
                data: saveCourse
            });
        }

        res.status(201).json({
            success: true,
            message: 'Course saved successfully',
    
            data:saveCourse
        })


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
        
    }
};
const getAllCourse = async(req, res)=>{
    try {

        const courseList = await Course.find({});
        res.status(200).json({
            success: true,
            data: courseList,
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
        
    }
};

const getCourseDetailsByID = async(req, res)=>{
    try {

        const {id} = req.params;
        const courseDetails = await Course.findById(id);

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: 'Course not found!'
            })
        }
        res.status(200).json({
            success: true,
            data: courseDetails
        })

        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
        
    }
};

const UpdateCourseByID = async(req, res)=>{
    try {
        const { id } = req.params;
        const UpdateCourseByID= req.body;

        const UpdateCourse = await Course.findByIdAndUpdate(id,updatedCourseData, {new: true});
        if(!updatedCourse){
            return res.status(404).json({
            success: false,
            message: " Course not found!",
        })
        }
        res.status(200).json({
            success: true,
            message: 'Course updated Successfully',
            data: updatedCourse
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
        
    }
}

module.exports = {addNewCourse, getAllCourse, UpdateCourseByID,getCourseDetailsByID}
