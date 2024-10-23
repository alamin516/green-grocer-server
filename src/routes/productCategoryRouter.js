const express = require("express");
const { createCategory, getCategory, updateCategory } = require("../controllers/productCategoryController");
const categoryRouter = express.Router();


categoryRouter.get("/categories", getCategory);

categoryRouter.post("/create-category", createCategory);

categoryRouter.put("/update-category/:id", updateCategory);


module.exports = categoryRouter;