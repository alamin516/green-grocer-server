require("dotenv").config();

const setAccessTokenCookie = (res, accessToken, time = "15") => {
  res.cookie("access_token", accessToken, {
    expires: new Date(Date.now() + time * 60 * 60 * 1000), // time in hours
    maxAge: time * 60 * 60 * 1000, // maxAge in milliseconds
    httpOnly: true, // Accessible only by the web server (not client-side JavaScript)
    secure: true, // Cookie is only sent over HTTPS
    sameSite: "lax", // Helps prevent CSRF attacks
    domain: "green-grocer-mart.web.app", // Correct domain format
  });
};

const setRefreshTokenCookie = (res, refreshToken, time = "7") => {
  res.cookie("refresh_token", refreshToken, {
    expires: new Date(Date.now() + time * 24 * 60 * 60 * 1000), // time in days
    maxAge: time * 24 * 60 * 60 * 1000, // maxAge in milliseconds
    httpOnly: true, // Accessible only by the web server (not client-side JavaScript)
    secure: true, // Cookie is only sent over HTTPS
    sameSite: "lax", // Helps prevent CSRF attacks
    domain: "green-grocer-mart.web.app", // Correct domain format
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
