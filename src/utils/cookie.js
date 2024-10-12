require("dotenv").config();

const setAccessTokenCookie = (res, accessToken, time = process.env.ACCESS_TOKEN_EXPIRE || 15) => {
  time = Number(time);
  res.cookie("access_token", accessToken, {
    expires: new Date(Date.now() + time * 60 * 60 * 1000), 
    maxAge: time * 60 * 60 * 1000,
    httpOnly: true,
    secure: true, 
    sameSite: "lax",
    domain: "green-grocer-mart.web.app",
  });
};

const setRefreshTokenCookie = (res, refreshToken, time = process.env.REFRESH_TOKEN_EXPIRE || 7) => {
  time = Number(time);
  res.cookie("refresh_token", refreshToken, {
    expires: new Date(Date.now() + time * 24 * 60 * 60 * 1000),
    maxAge: time * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    domain: "green-grocer-mart.web.app",
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
