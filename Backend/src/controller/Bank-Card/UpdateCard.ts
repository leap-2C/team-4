import prisma from "../../utils/PrismaClient";
import { Request, Response } from "express";

const updateCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cardId } = req.params;
    const { country, firstName, lastName, expriryDate} = req.body;

    const existingCard = await prisma.bankCard.findUnique({
      where: { id: cardId },
    });

    if (!existingCard) {
      res.status(404).json({ message: "Карт олдсонгүй." });
      return;
    }

    const updatedCard = await prisma.bankCard.update({
      where: { id: cardId },
      data: {
        country,
        firstName,
        lastName,
        expriryDate,
      },
    });

    res.status(200).json({ message: "Карт шинэчлэгдлээ", card: updatedCard });
  } catch (error) {
    console.error("Карт шинэчлэх үед алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default updateCard;
