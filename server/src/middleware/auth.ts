import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "";

export interface IPayload {
  id: string;
  iat: number;
  exp: number;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header("Authorization");
    if (!token) throw new Error("Token is not exsit");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, JWT_SECRET) as IPayload;
    if (!verified.id) throw new Error("Invalid token");

    const user = await User.findById(verified.id);
    if (!user) throw new Error("Access Denied");
    req.body.userId = user.id;
    next();
  } catch (error: any) {
    res.status(401).send(`${error.message}`);
  }
};
