import { create } from 'domain';
import mongoose from 'mongoose';
const refreshTokenSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jti: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    userAgent: { type: String, required: true },
    ipAddress: { type: String, required: true },
    familyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' },
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;