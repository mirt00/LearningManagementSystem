const esewa = require('../../helpers/esewa');
const Order = require('../../models/Order');
const StudentCourses = require('../../models/StudentCourses');
const Course = require('../../models/Course');

const createOrder =async (req, res) => {
    try {
        const {
            courseId,
            courseTitle,
            coursePrice,
            courseImage,
            instructorId,
            instructorName,
            instructorEmail,
            studentId,
            studentName,
            studentEmail,
            orderStatus,    
        }= req.body;
        const create_payment_json={
            intent: "sale",
            payer: {
                payment_method: "esewa"
            },
            redirect_urls:{
                return_url:`${process.env.CLIENT_URL}/PAYMENT-RETURN`,
                cancel_url:`${process.env.CLIENT_URL}/PAYMENT-CANCEL`,
            },
            transactions:[
                {
                    item_list:{
                        items:[
                            {
                                name: courseTitle,
                                sku: courseId,
                                price: coursePrice,
                                currency: "NPR",
                                quantity: 1
                            }
                        ]
                    },
                    amount:{
                        currency:"NPR",
                        total: coursePrice.toFixed(2),
                    },
                    description : courseTitle,

                }
            ]
        }
        payer.payment.create(create_payment_json, async (error, paymentInfo)=>{
            if(error0){
                return res.status(500).json({
                    success: false,
                    message: 'Error while creating esewa payment!'
                })
            }else{
                const newlyCreatedCourseOrder = new Order({
                    courseId,
                    courseTitle,
                    coursePrice,
                    courseImage,
                    instructorId,
                    instructorName,
                    instructorEmail,
                    studentId,
                    studentName,
                    studentEmail,
                    orderStatus,    
                })
                await newlyCreatedCourseOrder.save();
                const approveUrl = paymentInfo.links.find(link => link.rel === 'approval_url').href;
                res.status(201).json({
                    success: true,
                    data : {
                        approveUrl,
                        orderId: newlyCreatedCourseOrder._id,
                    
                    }
                })
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occurred!',
        });
    }
}

const capturePaymentAndFinalizeOrder = async (req, res) => {
    try {
        const{ paymentId, payerId, orderId} = req.body;
        let order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({
                success: false,
                message: 'Order not found!',
            });
        }
        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'
        order.paymentId = paymentId;
        order.payerId = payerId;
        await order.save();
        //update out student course model
        const studentCourse = await StudentCourses.findOne({userId: order.studentId})
        if(StudentCourses){
            studentCourse.push({
                courseId: order.courseId,
                title: order.courseTitle,
                instructorId: order.instructorId,
                instructorName: order.instructorName,
                dateOfPurchase: order.orderDate,
                courseImage: order.courseImage,
            })
            await studentCourse.save();
           
        }else {
            const newStudentCourse = new StudentCourses({
                userId: order.studentId,
                course: [
                    {
                        courseId: order.courseId,
                        title: order.courseTitle,
                        instructorId: order.instructorId,
                        instructorName: order.instructorName,
                        dateOfPurchase: order.orderDate,
                        courseImage: order.courseImage,
                    }
                ]
            })
            await newStudentCourse.save();

        }
        //update the course schema students
        await Course.findByIdAndUpdate(order.courseId,{
            $addToSet: {
                students: order.userId,
                studentName: order.userName,
                studentEmail: order.userEmail,
                paidAmount: order.coursePrice, 
            }
        })
        res.status(200).json({
            success: true,
            message: 'Order Confirmed!',
            data: order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Some error occurred!',
        });
    }
}
module.exports = {
    createOrder,
    capturePaymentAndFinalizeOrder
}