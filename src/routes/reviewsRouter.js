const express = require("express");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { updateAccessToken } = require("../controllers/userController");
const {
  addProductReview,
  likeReview,
  reviewReplied,
  getProductReview,
} = require("../controllers/reviewsController");
const reviewRouter = express.Router();

// products
reviewRouter.get("/product/review/:productId", getProductReview);

reviewRouter.put(
  "/products/:productId/reviews",
  updateAccessToken,
  isAuthenticated,
  addProductReview
);

reviewRouter.put(
  "/products/:productId/reviews/:reviewId/reply",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin", "manager"),
  reviewReplied
);

reviewRouter.put(
  "/products/:productId/reviews/:reviewId/like",
  updateAccessToken,
  isAuthenticated,
  likeReview
);

// Posts

// reviewRouter.get("/product/review/:productId", getProductReview);

// reviewRouter.put("/products/:productId/reviews", updateAccessToken, isAuthenticated, addProductReview);

// reviewRouter.put("/products/:productId/reviews/:reviewId/reply", updateAccessToken, isAuthenticated, authorizeRoles("admin", "manager"), reviewReplied);

// reviewRouter.put("/products/:productId/reviews/:reviewId/like", updateAccessToken, isAuthenticated, likeReview);

module.exports = reviewRouter;
