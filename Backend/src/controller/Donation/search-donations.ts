import { Request, Response } from "express";
import prisma from "../../utils/PrismaClient";
const searchDonations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { query } = req.query;

    const results = await prisma.donation.findMany({
      where: {
        recipientId: userId,
        OR: [
          {
            specialMessage: {
              contains: query as string,
              mode: "insensitive",
            },
          },
          {
            socialURLorBuyMeACoffee: {
              contains: query as string,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: { timestamp: "desc" },
    });

    res.status(200).json(results);
  } catch (error) {
    console.error("Хайлт хийхэд алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default searchDonations;
