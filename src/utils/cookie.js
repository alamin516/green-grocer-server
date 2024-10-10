const setAccessTokenCookie = (res, accessToken, time = "15") => {
  res.cookie("access_token", accessToken, {
    maxAge: time * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });
};

const setRefreshTokenCookie = (res, refreshToken, time = "7") => {
  res.cookie("refresh_token", refreshToken, {
    maxAge: time * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });
};

module.exports = { setAccessTokenCookie, setRefreshTokenCookie };
