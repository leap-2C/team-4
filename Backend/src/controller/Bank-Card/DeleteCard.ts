import prisma from "../../utils/PrismaClient";

import { Request, Response } from "express";

const deleteCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cardId } = req.params;

    const existingCard = await prisma.bankCard.findUnique({
      where: { id: cardId },
    });

    if (!existingCard) {
      res.status(404).json({ message: "Карт олдсонгүй." });
      return;
    }

    await prisma.bankCard.delete({
      where: { id: cardId },
    });

    res.status(200).json({ message: "Карт амжилттай устгагдлаа." });
  } catch (error) {
    console.error("Карт устгах үед алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа." });
  }
};

export default deleteCard;
