
import prisma from "../../utils/PrismaClient";
import { Request, Response } from "express";



const createCard = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { country, firstName, lastName, expriryDate } = req.body;

    if (!country || !firstName || !lastName || !expriryDate) {
      res.status(400).json({ message: "Бүх талбарыг бөглөнө үү." });
      return;
    }

    const newCard = await prisma.bankCard.create({
      data: {
        country,
        firstName,
        lastName,
        expriryDate,
        userId,
      },
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error("Карт үүсгэх алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default createCard;