require("dotenv").config();

const setAccessTokenCookie = (res, accessToken, time = "15") => {
  res.cookie("access_token", accessToken, {
    domain: "green-grocer-mart.web.app",
    path: "/",
    maxAge: time * 60 * 60 * 1000,
    httpOnly: true,
    secure: true, 
    sameSite: "none",
  });
};

const setRefreshTokenCookie = (res, refreshToken, time = "7") => {
  res.cookie("refresh_token", refreshToken, {
    domain: "green-grocer-mart.web.app",
    path: "/",
    maxAge: time * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
