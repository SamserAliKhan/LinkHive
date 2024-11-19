import { auth } from '../../config/firebase-config.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

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
