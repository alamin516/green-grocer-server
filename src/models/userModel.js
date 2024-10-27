require("dotenv").config();
const bcryptjs = require("bcryptjs");
const { Schema, model } = require("mongoose");

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegexPattern = /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/;

// Schema for Cart Item
const cartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

// Schema for Wishlist Item
const wishlistItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { _id: false }
);

// Schema for Delivery Address
const deliveryAddressSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (phone) {
          return /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/.test(phone);
        },
        message: "Please enter a valid Bangladeshi phone number.",
      },
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      default: "Bangladesh",
    },
  },
  { _id: false }
);

// Schema for Payment Method
const paymentMethodSchema = new Schema(
  {
    cardType: {
      type: String,
      enum: ["Visa", "MasterCard", "American Express", "bKash", "Nagad"],
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    cardHolderName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "User name should be a minimum of 3 characters"],
      maxlength: [31, "User name should be a maximum of 31 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return emailRegexPattern.test(email);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minlength: [8, "User password should be a minimum of 8 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "seller", "user", "customer", "editor", "manager"],
      default: "user",
    },
    image: {
      type: String,
      default: process.env.USER_DEFAULT_IMAGE || "upload/images/users/default_user.png"
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: function (phone) {
          return phoneRegexPattern.test(phone);
        },
        message: "Please enter a valid Bangladeshi phone number.",
      },
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    // For sellers, additional vendor-specific fields
    vendorProfile: {
      shopName: {
        type: String,
        trim: true,
        maxlength: 100,
      },
      shopDescription: {
        type: String,
        trim: true,
        maxlength: 1000,
      },
      shopAddress: {
        type: String,
      },
      totalSales: {
        type: Number,
        default: 0,
      },
      products: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },

    // For customers: Carts, Wishlist, and Orders
    // For Cart Items
    // cart: [cartItemSchema],

    // For Wishlist
    // wishlist: [wishlistItemSchema],

    // For Delivery Addresses
    deliveryAddresses: [deliveryAddressSchema],

    // For Payment Methods
    paymentMethods: [paymentMethodSchema],

    // Orders History
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    // Review System
    reviews: [],
  },
  { timestamps: true }
);

// Hash Password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcryptjs.compare(inputPassword, this.password);
};

const User = model("User", userSchema);

module.exports = { User, deliveryAddressSchema, paymentMethodSchema };
