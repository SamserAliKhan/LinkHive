import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import {auth} from '../config/firebase-config.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export const sginup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bycrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "User creation failed" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in', error });
    }
  };

  export const sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;
  
    try {
      const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      res.status(200).json({ verificationId: confirmationResult.verificationId });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Error sending OTP', error });
    }
  };