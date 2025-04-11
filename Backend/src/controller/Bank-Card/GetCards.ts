import prisma from "../../utils/PrismaClient";
import { Request, Response } from "express";

const getCards = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cards = await prisma.bankCard.findMany({
      where: { userId },
    });

    res.status(200).json(cards);
  } catch (error) {
    console.error("Карт авах алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default getCards;
