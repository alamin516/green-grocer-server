require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");


const { errorResponse } = require("./controllers/responseController");
const { seedRouter } = require("./routes/seedRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/productCategoryRouter");
const cartRouter = require("./routes/cartRouter");
const reviewRouter = require("./routes/reviewsRouter");
const orderRouter = require("./routes/orderRouter");


const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: "Too many requests, please try again later"
})

// Middlewares
app.use(morgan("dev"));

app.set('trust proxy', 1)

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Cookie Parser
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN || "https://green-grocer-mart.web.app",
    credentials: true,
  })
);

app.use(rateLimiter);
app.use(xssClean());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Routes /api/v1/
app.use("/api/v1", seedRouter, userRouter, cartRouter, productRouter, categoryRouter, reviewRouter, orderRouter);



// Testing api
app.get("/api/v1/test", (req, res)=>{
    res.status(200).json({
        status: "success",
        message: "Hello from server",
    });
})



// client Error Handle
app.use((req, res, next)=> {
    next(createError(404, `${req.originalUrl} route not found`));
});


app.use((error, req, res, next)=> {
    return errorResponse(res, {
        statusCode: error.status,
        message: error.message
    });

})

module.exports = app;
