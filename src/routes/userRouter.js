const express = require("express");
const { createAccount, verifyUser, login, logout, updateAccessToken, getUserInfo, forgetPassword, resetPasswordTokenValidate, updateUserPassword } = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");
const userRouter = express.Router();


userRouter.post("/create-account", createAccount);

userRouter.post("/verify-user", verifyUser);

userRouter.post("/login", login);

userRouter.get("/logout", isAuthenticated, logout);

userRouter.post("/refresh", updateAccessToken);

userRouter.get("/me", updateAccessToken, isAuthenticated, getUserInfo);


// Reset Password
userRouter.post("/forget-password", forgetPassword);
userRouter.post('/reset-token-validate', resetPasswordTokenValidate)
userRouter.put("/update-password", updateUserPassword);



module.exports = userRouter;