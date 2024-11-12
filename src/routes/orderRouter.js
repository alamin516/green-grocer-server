const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const orderRouter = express.Router();

const {
  createOrder,
  newPayment,
  sendStripePublishableKey,
  getOrdersByUser,
  getOrdersByAdmin,
} = require("../controllers/orderController");
const { updateAccessToken } = require("../controllers/userController");

orderRouter.post("/create-order", isAuthenticated, createOrder);

orderRouter.get("/get-orders-by-user", isAuthenticated, getOrdersByUser);

orderRouter.get(
  "/all-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin", "manager"),
  getOrdersByAdmin
);

orderRouter.get(
  "/payment/stripe-publishable-key",
  // isAuthenticated,
  sendStripePublishableKey
);

orderRouter.post("/payment", isAuthenticated, newPayment);

module.exports = orderRouter;
