const CatchAsyncError = require("../middlewares/CatchAsyncErrors");
const { Product } = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");

const getProductReview = CatchAsyncError(async (req, res, next) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Review fetched",
    review: product.reviews,
  });
});

const addProductReview = CatchAsyncError(async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    if (!req.user || !req.user._id) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    // Create a new review
    const newReview = {
      userId: req.user._id,
      username: req.user.name,
      rating,
      comment,
    };

    // Add review to product
    product.reviews.push(newReview);

    // Ensure rating is initialized
    if (!product.rating) {
      product.rating = {
        count: 0,
        average: 0,
      };
    }

    // Update rating count and average
    const totalRatings = product.rating.count + 1;
    const totalScore = product.rating.average * product.rating.count + rating;
    const newAverage = totalScore / totalRatings;

    product.rating.average = newAverage;
    product.rating.count = totalRatings;

    // Save product with the new review and update rating
    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

const reviewReplied = CatchAsyncError(async (req, res, next) => {
  try {
    const { productId, reviewId } = req.params;
    const { comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    if (!req.user || !req.user._id) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    // Create a new review reply
    const reply = {
      userId: req.user._id,
      username: req?.user?.name,
      comment,
    };

    // Add review reply
    review.commentReplies.push(reply);

    // Save product with the new review and update rating
    await product.save();

    res.status(201).json({
      success: true,
      message: "Review replied",
      reviews: product.reviews,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

const likeReview = CatchAsyncError(async (req, res, next) => {
  try {
    const { productId, reviewId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return next(new ErrorHandler("User not found", 404));
    }

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }

    const hasLiked = review.likes.some(
      (like) => like.userId.toString() === userId.toString()
    );
    if (hasLiked) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this review",
      });
    }

    review?.likes.push({ userId });

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review liked successfully",
      review: product.reviews,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

module.exports = { getProductReview, addProductReview, reviewReplied, likeReview };
