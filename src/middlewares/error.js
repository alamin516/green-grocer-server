const ErrorHandler = require("../utils/ErrorHandler");

const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //   Mongo id error
  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource is not found invalid ${err.path}`, 400);
  }
  //   Duplicate key error
  if (err.code === 11000) {
    err = new ErrorHandler(
      `Duplicate field value entered for ${err.keyValue.name}`,
      400
    );
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid token, please login again", 401);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler("Token has expired, please login again", 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};


module.exports = ErrorMiddleware;