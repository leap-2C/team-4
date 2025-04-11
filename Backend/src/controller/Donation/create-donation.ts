
import { Request, Response, NextFunction } from "express";
import prisma from "../../utils/PrismaClient";



const createDonation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      amount,
      specialMessage,
      socialURLorBuyMeACoffee,
      donorId,
      recipientId,
    } = req.body;

    if (!amount || !donorId || !recipientId) {
      res.status(400).json({ message: "Шаардлагатай талбарууд дутуу байна." });
      return;
    }

    const donation = await prisma.donation.create({
      data: {
        amount,
        specialMessage,
        socialURLorBuyMeACoffee,
        donorId,
        recipientId,
      },
    });

    res.status(201).json(donation);
  } catch (error) {
    next(error); 
  }
};

export default createDonation;
