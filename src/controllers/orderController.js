const CatchAsyncError = require("../middlewares/CatchAsyncErrors");
const Order = require("../models/orderModel");
const { Product } = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createOrder = CatchAsyncError(async (req, res, next) => {
  try {
    const {
      payment_info,
      items,
      totals,
      billingAddress,
      shippingAddress,
      paymentMethod,
      notes,
      isGiftOrder,
    } = req.body;

    // Validate payment info
    if (payment_info) {
      const paymentIntentId = payment_info.id;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ message: "Payment failed" });
      }
    }

    // Prepare payment info for saving
    const paymentInfo = {
      cardType: payment_info?.payment_method_types?.[0] || null,
      transactionId: payment_info?.id || null,
      paymentStatus: payment_info?.status === "succeeded" ? "Paid" : "Pending",
      amount: payment_info?.amount ? payment_info.amount / 100 : 0,
      currency: payment_info?.currency || null,
    };

    // Generate a unique 8-character order ID
    function generateOrderId() {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let orderId = "";
      for (let i = 0; i < 8; i++) {
        orderId += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return orderId;
    }

    const orderId = generateOrderId();

    // Create a new order instance
    const newOrder = await Order.create({
      orderId,
      userId: req.user._id,
      items,
      totals,
      billingAddress,
      shippingAddress,
      paymentMethod,
      paymentInfo,
      notes,
      isGiftOrder,
    });

    await Promise.all(
      items.map(async (item) => {
        await Product.updateOne(
          { _id: item.productId },
          {
            $inc: {
              sold: item.quantity,
              stock_quantity: -item.quantity,
            },
          }
        );
      })
    );

    res.status(201).json({
      status: "success",
      message: "Order successfully created",
      data: newOrder,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});


// Get all orders by the authenticated user
const getOrdersByUser =  CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;


    const userOrders = await Order.find({ userId }).sort({ createdAt: -1 }); 

    const orders = {
      totalOrders: userOrders,
      pending: userOrders.filter(i => i.orderStatus === "pending"),
      processing: userOrders.filter(i => i.orderStatus === "processing"),
      shipped: userOrders.filter(i => i.orderStatus === "shipped"),
      delivered: userOrders.filter(i => i.orderStatus === "delivered"),
    }
    res.status(200).json({
      status: 'success',
      results: userOrders.length,
      data: orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});


// Get all orders by admin
const getOrdersByAdmin =  CatchAsyncError(async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }); 

    res.status(200).json({
      status: 'success',
      message: "Order fetched successfully",
      data: orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});


// send stripe publishable key
const sendStripePublishableKey = CatchAsyncError(async (req, res, next) => {
  try {
    res.status(200).json({
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// new payment
const newPayment = CatchAsyncError(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "green-grocer",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(201).json({
      success: true,
      clientSecret: myPayment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrdersByAdmin,
  sendStripePublishableKey,
  newPayment,
};
