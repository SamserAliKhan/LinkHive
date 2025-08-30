import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/tokenServices.js";

export const refresh = async (req, res) => {
  try {
    const oldRt = req.cookies.refreshToken;
    if (!oldRt) return res.status(401).json({ message: "No refresh token" });

    let payload;
    try {
      payload = jwt.verify(oldRt, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // 1. Lookup RT in DB
    const tokenDoc = await RefreshToken.findOne({ jti: payload.jti });
    if (!tokenDoc || tokenDoc.revoked || tokenDoc.expiresAt < new Date()) {
      return res.status(403).json({ message: "Refresh token revoked/expired" });
    }

    // 2. Revoke old RT
    tokenDoc.revoked = true;
    tokenDoc.revokedAt = new Date();
    await tokenDoc.save();

    // 3. Create new RT
    const userId = payload.userId;
    const userAgent = req.get("User-Agent") || "unknown";
    const ip = req.ip;

    const newAccessToken = generateAccessToken({
      _id: userId,
      role: payload.role,
    });
    const newRefreshToken = await generateRefreshToken(
      { _id: userId, role: payload.role },
      payload.familyId,
      userAgent,
      ip
    );

    // 4. Set new cookies
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.COOKIE_SAMESITE || "None",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.COOKIE_SAMESITE || "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/auth/refresh",
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
