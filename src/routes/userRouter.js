const express = require("express");
const { createAccount, verifyUser, login, logout, updateAccessToken, getUserInfo, forgetPassword, resetPasswordTokenValidate, updateUserPassword, getAllUsers, updateResetUserPassword, updateRefreshAccessToken } = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const userRouter = express.Router();


userRouter.post("/create-account", createAccount);

userRouter.post("/verify-user", verifyUser);

userRouter.post("/login", login);

userRouter.get("/logout", isAuthenticated, logout);

userRouter.post("/refresh-token", updateRefreshAccessToken);

userRouter.get("/me", updateAccessToken, isAuthenticated, getUserInfo);

userRouter.put("/update-user-password",  updateAccessToken, isAuthenticated, updateUserPassword);


// Reset Password or Forget password without login
userRouter.post("/forget-password", forgetPassword);
userRouter.post('/reset-token-validate', resetPasswordTokenValidate)
userRouter.put("/update-password", updateResetUserPassword);


// Admin Route
userRouter.get("/users",  updateAccessToken, isAuthenticated, authorizeRoles("admin", "manager", "user"), getAllUsers)


module.exports = userRouter;