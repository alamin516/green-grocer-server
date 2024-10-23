const { Schema, model } = require("mongoose");

// Comment Reply Schema
const commentReplySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  }
},{ timestamps: true });

// Review Schema
const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  commentReplies: [commentReplySchema], 
},{ timestamps: true });

// Product Schema
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    short_description: {
      type: String,
      required: false,
      trim: true,
    },
    long_description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount_price: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    product_type:{
        type: String
    },
    type: {
      type: String,
      enum: ["simple", "external", "affiliated", "variable"],
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "private", "published", "pending"],
      default: "draft",
    },
    sku: {
      type: String,
    },
    stock_quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sold: {
        type: Number,
        min: 0,
        default: 0,
    },
    category: [{
      type: Schema.Types.ObjectId,
      ref: "Category",
    }],
    brand: [{
      type: Schema.Types.ObjectId,
      ref: "Brand",
    }],
    tags: [{
      type: Schema.Types.ObjectId,
      ref: "Tag",
    }],
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor", 
      required: false,
    },
    reviews: [reviewSchema],
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    specification: [{
      key: { type: String, trim: true },
      value: { type: String, trim: true },
    }],
    images: [{
      url: { type: String},
      alt: {type: String}
    }],
    seo: {
      title: String,
      meta_description: String,
      meta_keywords: [String],
      meta_image: {
        url: { type: String},
        alt: {type: String}
      }
    },
  },
  { timestamps: true }
);

// Indexing to improve search performance
productSchema.index({ title: "text", short_description: "text", long_description: "text" });

const Product = model("Product", productSchema);

module.exports = { Product };
