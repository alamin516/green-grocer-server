require("dotenv").config();
const { User } = require("../models/userModel");
const { jwtAccessSecret } = require("../secret");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return next(
        new ErrorHandler(
          "Unauthorized",
          401
        )
      );
    }

    const decoded = jwt.verify(token, jwtAccessSecret);

    if (!decoded || !decoded.user || !decoded.user._id) {
      return next(new ErrorHandler("Invalid or expired access token", 401));
    }

    const user = await User.findById(decoded.user._id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler("Unauthorized access. Invalid token.", 401));
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role || "")) {
      return next(
        new ErrorHandler(
          "Forbidden",
          403
        )
      );
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizeRoles };
