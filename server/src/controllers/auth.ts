import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "";

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) return res.status(400).json({ message: " " });

    const newUser: IUser = new User({
      mobile,
      password
    });
    newUser.password = await newUser.encryptPassword(password);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

/* LOGING IN */
export const login = async (req: Request, res: Response) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) return res.status(400).json({ message: "mobile password does not empty. " });
    let user = await User.findOne({ mobile });
    if (!user) return res.status(203).json({ message: "User does not exist. " });

    const isMatch = await user.validatePassword(password);
    if (!isMatch) return res.status(203).json({ message: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 60 * 60 * 24
    });
    delete user.password;
    res.header("Authorization", `Bearer ${token}`).status(200).json({ accessToken: token, userInfo: user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
