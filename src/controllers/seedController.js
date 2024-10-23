const bcryptjs = require("bcryptjs");
const data = require("../data");
const { User } = require("../models/userModel");
const { Product } = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const Category = require("../models/productCategoryModel");
const { Language } = require("../models/languageModel");

const seedUser = async (req, res, next) => {
  try {
    await User.deleteMany({});
    console.log("Existing users deleted");

    const users = await Promise.all(
      data.users.map(async (user) => {
        user.password = await bcryptjs.hash(user.password, 10);
        return user;
      })
    );

    const seededUsers = await User.insertMany(users);
    console.log("Users seeded successfully");

    res.status(200).json({
      success: true,
      message: "Users seeded successfully",
      users: seededUsers,
    });
  } catch (error) {
    next(error);
  }
};

const seedProducts = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if(!userId){
      return next(new ErrorHandler("Please Login first!", 400));
    }

    await Product.deleteMany({});
    console.log("Existing products deleted");

    const seededProducts = await Product.insertMany(data.products);
    console.log("Products seeded successfully");

    res.status(200).json({
      success: true,
      message: "Products seeded successfully",
      products: seededProducts,
    });
  } catch (error) {
    next(error);
  }
};

const seedProductCategory = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    if(!userId){
      return next(new ErrorHandler("Please Login first!", 400));
    }

    await Category.deleteMany({});
    console.log("Existing categories deleted");

    const seededProducts = await Category.insertMany(data.categories);
    console.log("Category seeded successfully");

    res.status(200).json({
      success: true,
      message: "Category seeded successfully",
      categories: seededProducts,
    });
  } catch (error) {
    next(error);
  }
};


const seedLanguages = async (req, res, next) => {
  try {
    const languages = await Language.insertMany(data.languages);
    console.log('Languages seeded successfully');
    res.status(200).json({
      success: true,
      message: "Languages seeded successfully",
      languages,
    });
  } catch (error) {
    console.error('Seeding error:', error);
  }
};


module.exports = { seedUser, seedProducts , seedProductCategory, seedLanguages};
