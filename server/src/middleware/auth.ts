import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"

const JWT_SECRET = process.env.JWT_SECRET || ''

export interface IPayload {
  _id: string;
  iat: number;
  exp: number
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header("Authorization")
    if (!token) return res.status(403).send("Access Denied")
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart()
    }
    const verified = jwt.verify(token, JWT_SECRET) as IPayload;
    req.userId = verified._id;
    next()
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}