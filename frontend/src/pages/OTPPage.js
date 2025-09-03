import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP, handleApiCall } from "../services/apiService";

const OTPPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await handleApiCall(sendOTP, phoneNumber);
      setOtpSent(true);
      alert("OTP sent successfully!");
      console.log(result); // for debugging
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      alert(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await handleApiCall(verifyOTP, phoneNumber, otp);
      alert("OTP verified successfully! User authenticated.");
      console.log(result); // for debugging
      navigate("/dashboard");
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
      alert(error.message || "Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default OTPPage;
