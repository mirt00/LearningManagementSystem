const express = require("express");
const {createOrder, getAllOrders, getSingleOrder, updateOrderStatus, capturePaymentAndFinalizeOrder} = require("../../controllers/student-controller/order-controller");
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/capture", capturePaymentAndFinalizeOrder);

module.exports = router;