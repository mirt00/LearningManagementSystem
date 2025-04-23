const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
    userId: String,
    course: [
        {
            courseId: String,
            userName: String,
            userEmail: String,
            orderStatus: String,
            paymentMethod: String,
            paymentStatus: String,
            orderDate: Date,
            paymentId : String,
            payerId : String,
            instructorId: String,
            instructorName: String,
            courseImage: String,
            courseTitle: String,
            courseId: String,
            coursePriceing: String,

        }
    ]
});
module.exports = mongoose.model('Order', OrderSchema); 