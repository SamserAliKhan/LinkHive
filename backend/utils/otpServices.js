import {OTP} from "../models/otp.js";

class OTPService {
  static generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
  }
  static async saveOTP(mobileNumber, otp) {
    const existingOTP = await OTP.findOne({ mobileNumber });
    if (existingOTP) await OTP.deleteOne({ mobileNumber });
    const newOTP = new OTP({ mobileNumber, otp });
    await newOTP.save();
  }

  static async validateOTP(mobileNumber, otp) {
    const otpRecord = await OTP.findOne({ mobileNumber });
    // console.log("Stored OTP Record:", otpRecord);
    // console.log("Input OTP:", otp);

    if (!otpRecord || otpRecord.otp !== otp.toString()) {
      console.log("OTP Validation failed");
      return false;
    }

    console.log("OTP Validation successful");
    await OTP.deleteOne({ mobileNumber });
    return true;
  }

  static async sendOTP(mobileNumber, otp) {
    // Send OTP to mobileNumber
    console.log(`Sending OTP ${otp} to ${mobileNumber}`); // Replace with real SMS logic
  }
}

export default OTPService;