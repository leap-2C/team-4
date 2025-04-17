import { Request, Response, NextFunction } from "express";
import prisma from "../../utils/PrismaClient";

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        bankCard: true,
        Profile: true,
        Donation: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default getUserById;
