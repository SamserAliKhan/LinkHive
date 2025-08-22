import jwt from 'jsonwebtoken';
import RefreshToken from '../models/RefreshToken.js';

function generateAccessToken(user) {
    console.log(process.env.JWT_ACCESS_SECRET);
    
    return jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );
}
async function generateRefreshToken(user, familyId, userAgent, ipAddress) {
    const jti = jwt.sign(
      {
        userId: user._id,
        familyId,
      },
      process.env.JWT_REFRESH_SECRET
    );
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const refreshToken = new RefreshToken({
        userID: user._id,
        jti,
        expiresAt,
        userAgent,
        ipAddress,
        familyID: familyId,
    });

    await refreshToken.save();
    return jti;

}

export { generateAccessToken, generateRefreshToken};