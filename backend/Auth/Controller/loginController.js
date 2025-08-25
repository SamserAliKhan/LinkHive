import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken} from '../services/tokenServices.js'

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      //1.Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });

      //2.Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      //3.Generate tokens
      // Generate access and refresh tokens
      const AccessToken = generateAccessToken(user);
      const RefreshToken = await generateRefreshToken(
        user,
        user.familyId,
        req.headers["user-agent"],
        req.ip
      );
      //4.Send tokens as **HTTP-only cookies**
        res.cookie("accessToken", AccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "true",
          sameSite: process.env.COOKIE_SAMESITE || "None",
          maxAge: 15 * 60 * 1000, // 15 minutes
        });
        res.cookie("refreshToken", RefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "true",
          sameSite: process.env.COOKIE_SAMESITE || "None",
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          path: '/auth/refresh', // Ensure the cookie is accessible across the application
        });
        // Debugging
        console.log(res.getHeaders()["set-cookie"]);
        //5.Send response
        res.status(200).json({
          message: "Login successful",
          user: { id: user.id, email: user.email },
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};
