require("dotenv").config();
const setAccessTokenCookie = (res, accessToken, time = "15") => {
  res.cookie("access_token", accessToken, {
    expires: new Date(Date.now() + time * 60 * 60 *  1000),
    maxAge: time * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
};

const setRefreshTokenCookie = (res, refreshToken, time = "7") => {
  res.cookie("refresh_token", refreshToken, {
    expires: new Date(Date.now() + time * 24 * 60 * 60 *  1000),
    maxAge: time * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
