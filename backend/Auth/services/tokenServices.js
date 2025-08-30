import jwt from 'jsonwebtoken';
import RefreshToken from '../models/RefreshToken.js';
import {v4 as uuidv4} from 'uuid';

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
  // jti = JSON Token ID
  const jti = uuidv4(); // Unique identifier for the token
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  const refreshJwt = jwt.sign(
    {
      userId: user._id,
      familyId,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
  const refreshToken = new RefreshToken({
    userID: user._id,
    jti,
    expiresAt,
    userAgent,
    ipAddress,
    familyID: familyId,
  });

  await refreshToken.save();
  return refreshJwt;
}

export { generateAccessToken, generateRefreshToken};