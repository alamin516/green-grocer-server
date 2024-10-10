require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 5001;

const frontendOrigin = process.env.ORIGIN || ""

const databaseURL = process.env.MONGODB_DATABASE_URL || "mongodb://localhost:27017/GreenGrocerDB"

const jwtAccessSecret = process.env.ACCESS_TOKEN || "XYZ-123-ABC";

const jwtResetPassKey = process.env.RESET_PASS_KEY || "XYZ-123-ABC";


const smtpUserName = process.env.SMTP_MAIL || "";
const smtpPassword = process.env.SMTP_PASS || "";



module.exports = {serverPort, frontendOrigin, databaseURL, jwtAccessSecret, smtpUserName, smtpPassword, jwtResetPassKey}