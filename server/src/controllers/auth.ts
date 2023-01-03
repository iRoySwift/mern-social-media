import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/User"

const JWT_SECRET = process.env.JWT_SECRET || ""

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const newUser: IUser = new User({
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    })
    newUser.password = await newUser.encryptPassword(password)
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

/* LOGING IN */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: "User does not exist. " })

    const isMatch = await user.validatePassword(password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: 60 * 60 * 24
    })
    delete user!.password;
    res.header("Authorization", `Bearer ${token}`).status(200).json({ token, user })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}