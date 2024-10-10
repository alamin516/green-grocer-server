const express = require("express");
const { seedUser } = require("../controllers/seedController");


const seedRouter = express.Router();


seedRouter.get("/seedusers", seedUser);

module.exports = {seedRouter}