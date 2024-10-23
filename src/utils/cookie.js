require("dotenv").config();

const setAccessTokenCookie = (res, accessToken) => {
  res.cookie("access_token", accessToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
};

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };