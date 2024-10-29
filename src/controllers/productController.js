const { products } = require("../data");
const CatchAsyncError = require("../middlewares/CatchAsyncErrors");
const { Product } = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const slugify = require("../utils/slugify");

const getProducts = CatchAsyncError(async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const category = req.query.category || "";

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (req.query.minPrice !== undefined && req.query.maxPrice !== undefined) {
      filter.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
    }

    if (req.query.color) {
      filter.color = req.query.color;
    }

    if (
      req.query.ratingMin !== undefined &&
      req.query.ratingMax !== undefined
    ) {
      filter["ratings.average"] = {
        $gte: req.query.ratingMin,
        $lte: req.query.ratingMax,
      };
    }

    let sortOptions = {};

    if (req.query.sort === "Latest") {
      sortOptions.createdAt = -1;
    } else if (req.query.sort === "Old") {
      sortOptions.createdAt = 1;
    } else if (req.query.sort === "Ascending") {
      sortOptions.title = 1;
    } else if (req.query.sort === "Descending") {
      sortOptions.title = -1;
    } else if (req.query.sort === "PriceAsc") {
      sortOptions.price = 1;
    } else if (req.query.sort === "PriceDesc") {
      sortOptions.price = -1;
    }

    const products = await Product.find(filter)
      .sort(sortOptions)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(filter);

    const totalPages = Math.ceil(count / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const previousPage = page > 1 ? page - 1 : null;

    const pagination = {
      totalPages,
      currentPage: page,
      nextPage,
      previousPage,
    };

    // Featured products
    const featured_products = await Product.find({ featured: true })
    .sort({ createdAt: -1 })
    const product_type = await Product.find({ product_type: req.query.type});
    const latest_products = await Product.find({})
    .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: "Products fetch successfully",
      payload: {
        products: {
          all_products: products,
          featured_products,
          latest_products,
          product_type
        },
        pagination,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const createProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const product = req.body;

    const {
      title,
      long_description,
      short_description,
      price,
      discount_price,
      stock_quantity,
      category,
      tags,
      brand,
      status,
      stock_status,
      type,
      images,
      specification,
      seo,
      sku,
    } = product;

    if (images?.length === 0) {
      images.push({
        url: "upload/images/products/default_product.webp",
        alt: "Default Product Image",
      });
    }

    let slug = slugify(title);
    let newSlug = slug;
    let counter = 1;

    while (await Product.exists({ slug: newSlug })) {
      newSlug = `${slug}-${counter}`;
      counter++;
    }

    const newProduct = {
      title,
      slug: newSlug,
      long_description,
      short_description,
      price,
      discount_price,
      stock_quantity,
      category,
      tags,
      brand,
      status,
      stock_status,
      type,
      images,
      specification,
      seo,
      sku,
      user: req?.user?._id,
    };

    const data = await Product.create(newProduct);

    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    res.status(200).json({
      success: true,
      message: "Product fetch successfully",
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getProductId = CatchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    res.status(200).json({
      success: true,
      message: "Product fetch successfully",
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateProductId = CatchAsyncError(async (req, res, next) => {
  try {
    const body = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let slug = slugify(product.slug ? product.slug : product.title);
    let newSlug = slug;
    let counter = 1;

    while (await Product.exists({ slug: newSlug })) {
      newSlug = `${slug}-${counter}`;
      counter++;
    }

    const newProductData = {
      ...body,
      slug: slug,
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProductData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const copyProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let slug = slugify(product.title);
    let newSlug = slug;
    let counter = 1;

    while (await Product.exists({ slug: newSlug })) {
      newSlug = `${slug}-${counter}`;
      counter++;
    }

    const newProductData = {
      ...product,
      _id: undefined,
      title: `${product.title} (Copy)`,
      slug: `${newSlug}`,
      price: `${product.price}`,
      type: "simple",
      status: "draft",
      images: product.images.map((image) => ({
        ...image,
        _id: undefined,
      })),
      seo: product.seo,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newProduct = await Product.create(newProductData);

    res.status(201).json({
      success: true,
      message: "Product copied successfully",
      product: newProduct,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const deleteProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 400));
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const queryProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const { search } = req.query;

    const products = await Product.find({
      $or: [{ title: search }],
    });

    res.status(200).json({
      success: true,
      message: "Product seeded successfully",
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
  queryProduct,
  getProduct,
  getProductId,
  updateProductId,
  copyProduct,
};
