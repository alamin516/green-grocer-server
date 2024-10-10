const express = require("express");
const { createProduct, queryProduct } = require("../controllers/productController");
const productRouter = express.Router();


productRouter.post("/create-product", createProduct);
productRouter.get("/product", queryProduct);


module.exports = productRouter;