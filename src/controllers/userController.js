require("dotenv").config();
const jwt = require("jsonwebtoken");
const CatchAsyncError = require("../middlewares/CatchAsyncErrors");
const { User } = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { name } = require("body-parser");
const { createJSONWebToken } = require("../utils/jwt");
const { jwtAccessSecret, jwtResetPassKey } = require("../secret");
const {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} = require("../utils/cookie");
const emailSendWithNodeMailer = require("../utils/email");
const bcryptjs = require("bcryptjs");
const { handleForgetPassword } = require("../services/userService");

const createAccount = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const isEmailExist = await User.findOne({ email });
    const isPhoneExist = await User.findOne({ phone });

    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist", 400));
    }
    if (isPhoneExist) {
      return next(new ErrorHandler("Phone Number already exist", 400));
    }

    if (!phone) {
      return next(new ErrorHandler("Phone number is required", 400));
    }

    const user = {
      name,
      email,
      password,
      phone,
    };

    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    // Prepare email
    const emailData = {
      email,
      subject: "Account Activation Code",
      message: `Your account activation code is ${activationCode}`,
      html: `
        <h2>Hello ${user.name}</h2>
        <p>Your account activation code is ${activationCode}</p>
        `,
    };

    // send email with nodemailer
    try {
      await emailSendWithNodeMailer(emailData);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }

    res.status(201).json({
      success: true,
      message: "Please check your email to create an account",
      user: activationToken,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET,
    { expiresIn: "1h" }
  );
  return { token, activationCode };
};

const verifyUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { activation_code, activation_token } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, phone, password } = newUser.user;

    const newAccount = { name, email, phone, password };

    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return next(new ErrorHandler("Email already exist", 400));
    }

    await User.create(newAccount);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const login = CatchAsyncError(async (req, res, next) => {
  try {
    const { emailOrPhone, password } = req.body;
    const access_token = req.cookies.access_token;

    if (access_token) {
      return next(new ErrorHandler("You are already logged in", 400));
    }

    if (!emailOrPhone || !password) {
      return next(
        new ErrorHandler("Please provide both email or phone and password", 400)
      );
    }

    const filter = {
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    };

    const user = await User.findOne(filter);

    if (!user) {
      return next(
        new ErrorHandler("User not found, Please register an account", 400)
      );
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid password", 400));
    }

    const accessToken = createJSONWebToken({ user }, jwtAccessSecret, "15m");
    setAccessTokenCookie(res, accessToken);

    const refreshToken = createJSONWebToken({ user }, jwtAccessSecret, "7d");
    setRefreshTokenCookie(res, refreshToken);

    const userWithoutPass = user.toObject();
    delete userWithoutPass.password;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userWithoutPass,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const logout = CatchAsyncError(async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) {
      return next(new ErrorHandler("No refresh token found", 400));
    }

    const decoded = jwt.verify(refresh_token, jwtAccessSecret);

    const user = await User.findById(decoded.user);

    const accessToken = createJSONWebToken({ user }, jwtAccessSecret, "15m");
    const refreshToken = createJSONWebToken({ user }, jwtAccessSecret, "7d");

    req.user = user;

    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const getUserInfo = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Getting user data successfully",
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const forgetPassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new ErrorHandler("User not found, Please create an account first.", 500)
      );
    }
    const token = createJSONWebToken({ email }, jwtResetPassKey, "5m");

    await handleForgetPassword(user, token);

    res.status(201).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const resetPasswordTokenValidate = CatchAsyncError(async (req, res, next) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, jwtResetPassKey);

    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: decoded.email,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const updateResetUserPassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 500));
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    await User.updateOne({ email }, { $set: { password: hashPassword } });

    res.status(201).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

const updateUserPassword = CatchAsyncError(async (req, res, next) => {
  try {
    const { password, email } = req.body;

    if(req.user?.email !== email){
      return next(new ErrorHandler("You are not authorized to change this user's password", 403))
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 500));
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    await User.updateOne({ email }, { $set: { password: hashPassword } });

    res.status(201).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

const getAllUsers = CatchAsyncError(async (req, res, next) => {
  try {
    // const users = await User.find().select("name email phone role status vendorProfile");

    // const processedUsers = users.map(user => {
    //   if (user.role !== "seller") {
    //     user.vendorProfile = undefined;
    //   }
    //   return user;
    // })

    const users = await User.aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          phone: 1,
          role: 1,
          status: 1,
          vendorProfile: {
            $cond: {
              if: { $eq: ["$role", "seller"] },
              then: "$vendorProfile",
              else: "$$REMOVE",
            }
          }
        }
      }
    ])

    res.status(200).json({ success: true, users: users });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

module.exports = {
  createAccount,
  verifyUser,
  login,
  logout,
  updateAccessToken,
  getUserInfo,
  updateResetUserPassword,
  updateUserPassword,
  forgetPassword,
  resetPasswordTokenValidate,
  getAllUsers,
};
