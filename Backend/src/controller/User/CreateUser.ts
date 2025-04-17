import prisma from "../../utils/PrismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


import { Request, Response } from "express";


const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email болон нууц үг шаардлагатай." });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "Энэ и-мэйл бүртгэлтэй байна." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token, id: newUser.id });
  } catch (error) {
    console.error("Алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа." });
  }
};

export default createUser;
