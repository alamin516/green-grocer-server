const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");


const { errorResponse } = require("./controllers/responseController");


const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later"
})

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(xssClean());
app.use(express.json());
app.use(express.static("public"));


// Routes /api/v1/






// Testing api
app.get("/api/v1/test", (req, res)=>{
    res.status(200).json({
        status: "success",
        message: "Hello from server",
    });
})



// client Error Handle
app.use((req, res, next)=> {
    next(createError(404, "Route not found"));
});


app.use((error, req, res, next)=> {
    return errorResponse(res, {
        statusCode: error.status,
        message: error.message
    });

})

module.exports = app;