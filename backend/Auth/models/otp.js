import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 300

    }, // 5-minute expiry
});
export const OTP =  mongoose.model('OTP', otpSchema);