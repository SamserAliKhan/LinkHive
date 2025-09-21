import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../config/mongoDB.js";
import RefreshToken from "../models/RefreshToken.js"; // <-- matches Step 5

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // camelCase

    if (!refreshToken) {
      clearCookies(res);
      return res.status(StatusCodes.OK).json({ ok: true });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, config.jwt.refreshTokenSecret, {
        ignoreExpiration: true,
      });
    } catch (err) {
      clearCookies(res);
      return res.status(StatusCodes.OK).json({ ok: true });
    }

    // Revoke only this RT
    if (decoded?.jti) {
      await RefreshToken.findOneAndUpdate(
        { jti: decoded.jti },
        { revoked: true, revokedAt: new Date() }
      );
    }

    clearCookies(res);
    return res.status(StatusCodes.OK).json({ ok: true });
  } catch (err) {
    console.error("Logout error:", err);
    clearCookies(res);
    return res.status(StatusCodes.OK).json({ ok: true });
  }
};

const clearCookies = (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "strict",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: "strict",
    path: "/auth/refresh",
  });
};
