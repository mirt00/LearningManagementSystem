const CourseProgress = require("../../models/CourseProgress");
const Course = require('../../models/Course');
const StudentCourses = require('../../models/StudentCourses');

//mark  current leture as viewed 
const markLectureAsViewed = async (req, res) => {
    try {
        const { userId, courseId, lectureId} = req.body;
        let progress = await CourseProgress.find({userId, courseId});
        if(!progress){
            progress = new CourseProgress({
                userId,
                courseId,
                lecturesprogress:[{
                    lectureId,
                    viewed: true,
                    dateViewed: new Date()
                }]
            })
            await progress.save();
            
        }else{
            const lecturesProgress = progress.lecturesProgress.find(item => item.lectureId === lectureId);
            if(lecturesProgress){
                lecturesProgress.viewed = true;
                lecturesProgress.dateViewed = new Date();
            }else{
                progress.lecturesProgress.push({
                    lectureId,
                    viewed: true,
                    dateViewed: new Date()
                })
            }
            await progress.save();
        }
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success: false,
                message: 'Course not found!'
            })
        }
        //check all the lectures are viewed or not
        const allLecturesViewed = progress.lecturesProgress.length === course.lectures.length=== course.curriculum.length && progress.lecturesProgress.every(item => item.viewed === true);
        if(allLecturesViewed){
            progress.completed = true;
            progress.completionDate = new Date();
            await progress.save();
        }
        res.status(200).json({
            success: true,
            message: 'Lecture marked as viewed successfully',
            data:progress,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false,
            message: 'Some error occurred!'
         });
        
    }
}

//get current course progress

const getCurrentCourseProgress = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const studentPurchasedCourse = await StudentCourses.findOne({userId});
        const isCurrentCoursePurchasedByCurrentUserOrNot = studentPurchasedCourse?.findIndex(item=> item.courseId ===courseId) !== -1;

        if(!isCurrentCoursePurchasedByCurrentUserOrNot){
            return res.status(200).json({
                success: false,
                data:{
                    isPurchased: false
                },
                message: 'You need to purchase this course to access it.'
            })
        }
        const courseProgress = await CourseProgress.findOne({userId, courseId}).populate('courseId');
        if(currentUserCourseProgress.lecturesProgress.length === 0){
            const course = await Course.findById(courseId);
            if(!course){
                return res.status(400).json({
                    success: false,
                    message: 'Course not found!'
                })
            }
           return res.status(200).json({
            success: true,
            message: 'No progrss found, you can start the watching the course.',
            data:{
               courseDetails: course,
                progress: [],
                isPurchased: true
            }
           })
        }
        res.status(200).json({
            success: true,
            data:{
                courseDetails : currentUserCourseProgress.courseId,
                progress: currentUserCourseProgress.lecturesProgress,
                completed: currentUserCourseProgress.completed,
                completionDate: currentUserCourseProgress.completionDate,
                isPurchased: true
            }
        })

          
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false,
            message: 'Some error occurred!'
         });
        
    }
}

//reset course progress

const resetCurrentProgress = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const progress = await CourseProgress.findOne({userId, courseId});
        if(!progress){
            return res.status(400).json({
                success: false,
                message: 'Progress not found!'
            })
        }
        progress.lecturesProgress = [];
        progress.completed = false;
        progress.completionDate = null;
        await progress.save();
        res.status(200).json({
            success: true,
            message: 'Progress reset successfully',
            data: progress
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false,
            message: 'Some error occurred!'
         });
        
    }
};

module.exports = {
    markLectureAsViewed,
    getCurrentCourseProgress,
    resetCurrentProgress
};