const { Schema, model } = require("mongoose");

const productCategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true, default: "product" },
    image: {
      type: String,
      required: false,
      default: "/public/upload/images/placeholder.jpg",
    },
    banner: { type: String, required: false },
    cover: { type: String, required: false },
    parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
  },
  { timestamps: true }
);

const Category = model("Category", productCategorySchema);

module.exports = Category;
