const { products } = require("../data");
const CatchAsyncError = require("../middlewares/CatchAsyncErrors");
const { Product } = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");

const createProduct = CatchAsyncError(async (req, res, next) => {
  try {
    await Product.deleteMany();
    console.log("Existing products deleted");

    const seededProducts = await Product.insertMany(products);
    console.log("Product seeded successfully");

    res.status(200).json({
      success: true,
      message: "Product seeded successfully",
      users: seededProducts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const queryProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const { search } = req.query;

    const products = await Product.find({
        $or: [{ title:  search }]
    });

    res.status(200).json({
      success: true,
      message: "Product seeded successfully",
      products
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = { createProduct, queryProduct };
