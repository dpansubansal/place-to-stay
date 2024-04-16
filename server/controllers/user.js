import bcryptjs from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("first,", name, email, password);
    if (password.length < 6)
      return res
        .status(400)
        .json({ success: false, message: "password must be 6 char or more" });
    const emailLowerCase = email.toLowerCase();
    const existedUser = await User.findOne({ email: emailLowerCase });
    if (existedUser) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
    const hashedPassword = await bcryptjs.hash(password, 12); //complexity salt 12
    const user = await User.create({
      name,
      email: emailLowerCase,
      password,
      hashedPassword,
    });
    const { _id: id, photoUrl } = user;
    const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); //bcz we need these fields to add them with room records
    res.status(201).json({
      success: true,
      result: { id, name, email: user.email, photoUrl, token },
    });
  } catch (er) {
    console.log("errr", er);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};
