import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const Authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tokenValue = token.split(" ")[1];

  try {
    const user = jwt.verify(tokenValue, SECRET_KEY) as { id: string; email: string };
    (req as any).user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
