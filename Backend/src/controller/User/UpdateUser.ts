import { Request, Response } from "express";

import bcrypt from "bcrypt";

import prisma from "../../utils/PrismaClient";

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
      return;
    }

    const updatedData: any = {};

    if (name) {
      updatedData.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });

    res
      .status(200)
      .json({ message: "Хэрэглэгч амжилттай шинэчлэгдлээ", user: updatedUser });
  } catch (error) {
    console.error("Алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default updateUser;
