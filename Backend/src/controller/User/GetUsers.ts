import { Request, Response, NextFunction } from "express";

import prisma from "../../utils/PrismaClient";

const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        bankCard: true,
        Profile: true,
        Donation: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default getUsers;
