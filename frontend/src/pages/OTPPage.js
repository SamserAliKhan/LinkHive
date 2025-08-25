import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Config/axiosConfig";

const OTPPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("auth/otp/send", {
        mobileNumber: phoneNumber,
      });
      const result = response.data;

      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent successfully!");
        console.log(result); // for debugging
      } else {
        alert("Failed to send OTP. Please try again.");
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      
      const response = await api.post("auth/otp/verify", { mobileNumber: phoneNumber, otp });
      const result = response.data;
      if (response.ok) {
        alert("OTP verified successfully! User authenticated.");
        navigate("/dashboard");
      } else {
        alert("Please enter the correct OTP.");
        console.log(result.error);
        
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleSendOtp}>
          <h2>Send OTP</h2>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <h2>Verify OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default OTPPage;
