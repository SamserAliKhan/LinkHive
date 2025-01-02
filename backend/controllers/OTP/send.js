import OTPService from "../../utils/otpServices.js";

// This function sends an OTP to the user's mobile number
export const sendOTP = async (req, res) => {
    const { mobileNumber } = req.body;
    const otp = OTPService.generateOTP();
    await OTPService.saveOTP(mobileNumber, otp);
    await OTPService.sendOTP(mobileNumber, otp);
    res.status(200).json({ message: "OTP sent successfully" });
};