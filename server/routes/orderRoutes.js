const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { createOrder, getMyOrders, getAllOrders, getOrderById, markAsPaid } = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

router.get("/", protect, admin, getAllOrders);

router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, markAsPaid);

module.exports = router;

