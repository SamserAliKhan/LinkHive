import otpServices from "../../utils/otpServices.js";

// This function verifies the OTP sent by the user
export const verifyOTP = async (req, res) => {
    const { mobileNumber, otp } = req.body;
    try {
        // console.log("Mobile Number:", mobileNumber);
        // console.log("OTP:", otp);
        
        const isValid = await otpServices.validateOTP(mobileNumber, otp);
        // console.log(isValid);
        

        if (isValid) {
          res.status(200).json({ message: "OTP verified successfully" });
        } else {
          res.status(400).json({ message: "Invalid OTP" });
        }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}