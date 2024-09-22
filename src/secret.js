require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 5001;

const databaseURL = process.env.MONGODB_DATABASE_URL || "mongodb://localhost:27017/GreenGrocerDB"



module.exports = {serverPort, databaseURL}