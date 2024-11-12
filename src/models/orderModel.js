const { Schema, model } = require("mongoose");
const { deliveryAddressSchema, paymentMethodSchema } = require("./userModel");


// Order Schema
const orderSchema = new Schema({
  orderId: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: {
        type: String,
      },
      image: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unitPrice: {
        type: Number,
      },
      totalPrice:{
        type:Number,
      },
      discountPercentage: {
        type: Number,
        default: 0,
      },
    },
  ],
  totals: {},
  billingAddress: {},
  shippingAddress: {},
  paymentMethod: {
    type: String
  },
  paymentInfo: {},
  notes: {
    type: String
  },
  isGiftOrder: {
    type: Boolean,
    default: false,
  },
  orderStatus: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
}, { timestamps: true });

const Order = model("Order", orderSchema);

module.exports = Order;
