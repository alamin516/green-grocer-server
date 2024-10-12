require("dotenv").config();

const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("access_token", accessToken, {
    domain: "green-grocer-mart.web.app",
    path: "/",
    maxAge: 15 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true, 
    sameSite: "none",
  });
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    domain: "green-grocer-mart.web.app",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
