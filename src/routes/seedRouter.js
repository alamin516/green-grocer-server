const express = require("express");
const { seedUser, seedProducts, seedProductCategory, seedLanguages } = require("../controllers/seedController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { updateAccessToken } = require("../controllers/userController");


const seedRouter = express.Router();


seedRouter.get("/seed-users", updateAccessToken, isAuthenticated,  authorizeRoles("admin", "manager"), seedUser);
seedRouter.get("/seed-products", updateAccessToken, isAuthenticated,  authorizeRoles("admin", "manager"), seedProducts);
seedRouter.get("/seed-product-category", updateAccessToken, isAuthenticated,  authorizeRoles("admin", "manager", "user"), seedProductCategory);

seedRouter.get("/seed-language", updateAccessToken, isAuthenticated,  authorizeRoles("admin", "manager", "user"), seedLanguages)

module.exports = {seedRouter}