import bcryptjs from "bcryptjs";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";
export const register = tryCatch(async (req, res) => {
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
    password: hashedPassword,
  });
  const { _id: id, photoUrl } = user;
  const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  }); //bcz we need these fields to add them with room records
  res.status(201).json({
    success: true,
    result: { id, name, email: user.email, photoUrl, token },
  });
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();
  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser) {
    return res
      .status(404)
      .json({ success: false, message: "user doesn't exist" });
  }
  console.log("compP", password, existedUser.password);
  const correctPassword = await bcryptjs.compare(
    password,
    existedUser.password
  );
  console.log("firstPP", correctPassword);
  if (!correctPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Incorrect Password" });
  }

  const { _id: id, name, photoUrl } = existedUser;
  const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  }); //bcz we need these fields to add them with room records
  res.status(200).json({
    success: true,
    result: { id, name, email: emailLowerCase, photoUrl, token },
  });
});
