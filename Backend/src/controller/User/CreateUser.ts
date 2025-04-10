import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const prisma = new PrismaClient();

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

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа." });
  }
};

export default createUser;
