const express = require("express");
const { getCart } = require("../controllers/cartController");
const { isAuthenticated } = require("../middlewares/auth");
const cartRouter = express.Router();

cartRouter.get("/carts", isAuthenticated, getCart);
cartRouter.put("/update-carts", isAuthenticated, getCart);


module.exports =  cartRouter