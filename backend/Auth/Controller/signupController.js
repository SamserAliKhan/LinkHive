import bcrypt from "bcrypt";
import axios from "axios";
import User from "../models/userModel.js"; // your Auth DB user model

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({email});
  if(user){
    return res.status(400).json({message: "User alrady exist please Login"})
  }
  try {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Save in Auth DB
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // 3. Sync with User-Service (profile stub)
    try {
      await axios.post(
        process.env.INTERNAL_URL ,
        {
          userId: newUser._id,
          email: newUser.email,
          name: newUser.username,
        },
        {
          headers: { "X-Internal-Secret": process.env.INTERNAL_SECRET },
        }
      );
    } catch (err) {
      console.error("User-Service sync failed:", err.message);
      // You may decide: either continue signup OR rollback
      // For MVP: just log error and continue
    }

    // 4. Respond
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
};
