const express = require("express");
const {
  createProduct,
  queryProduct,
  getProducts,
  deleteProduct,
  getProduct,
  getProductId,
  updateProductId,
  copyProduct,
} = require("../controllers/productController");
const { isAuthenticated } = require("../middlewares/auth");
const { updateAccessToken } = require("../controllers/userController");
const productRouter = express.Router();

productRouter.get("/get-products", getProducts);

productRouter.post(
  "/create-product",
  updateAccessToken,
  isAuthenticated,
  createProduct
);

productRouter.put(
  "/update-product/:id",
  updateAccessToken,
  isAuthenticated,
  updateProductId
);

productRouter.delete(
  "/delete-product/:id",
  updateAccessToken,
  isAuthenticated,
  deleteProduct
);

productRouter.get("/get-product/:slug", getProduct);

productRouter.get(
  "/get-product-id/:id",
  updateAccessToken,
  isAuthenticated,
  getProductId
);

productRouter.post(
  "/copy-product/:id",
  updateAccessToken,
  isAuthenticated,
  copyProduct
);

module.exports = productRouter;
