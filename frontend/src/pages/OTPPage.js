import React, { useState } from 'react';
import { auth } from '../Config/Firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from 'firebase/auth';

const OTPPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setUpRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      alert('OTP sent!');
    } catch (error) {
      console.error('Error during signInWithPhoneNumber', error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      await auth.signInWithCredential(credential);
      alert('User signed in!');
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <form onSubmit={handleSendOtp}>
        <input 
          type="text" 
          placeholder="Phone Number" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          required 
        />
        <button type="submit">Send OTP</button>
      </form>
      {verificationId && (
        <form onSubmit={handleVerifyOtp}>
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
