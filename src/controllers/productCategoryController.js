const CatchAsyncError = require("../middlewares/CatchAsyncErrors");
const Category = require("../models/productCategoryModel");
const ErrorHandler = require("../utils/ErrorHandler");
const slugify = require("../utils/slugify");

const getCategory = CatchAsyncError(async (req, res, next) => {
  try {
    const {type} = req.query;

    console.log(type)

    const categories = await Category.find({type});

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      categories
    });

  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createCategory = CatchAsyncError(async (req, res, next) => {
  try {
    const body = req.body;
    
    let newSlug = body.slug ? slugify(body.slug) : slugify(body.name);

    const newCategory = {
      ...body,
      slug: newSlug,
    };

    const exist = await Category.findOne({name: body.name});
    if(exist) {
        return next(new ErrorHandler("Already Exist", 400));
    }

    await Category.create(newCategory)

    res.status(200).json({
      success: true,
      message: "Product seeded successfully",
      category: newCategory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateCategory = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const existId = await Category.findOne({_id: id});
    if(!existId) {
        return next(new ErrorHandler("Category not found", 404));
    }

    let newSlug = body.slug ? slugify(body.slug) : slugify(body.name);

    const newCategory = {
      ...body,
      slug: newSlug,
    };

    const exist = await Category.findOne({name: body.name});
    if(exist) {
        return next(new ErrorHandler("Already Exist", 400));
    }

    // await Category.create(newCategory)

    res.status(200).json({
      success: true,
      message: "Product seeded successfully",
      category: newCategory,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = { getCategory, createCategory, updateCategory };
