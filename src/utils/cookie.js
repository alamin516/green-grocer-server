require("dotenv").config();

const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("access_token", accessToken, {
    maxAge: 15 * 60 * 1000, // 15 minutes
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: process.env.COOKIE_DOMAIN
  });
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
    sameSite: "None",
    domain: process.env.COOKIE_DOMAIN
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
