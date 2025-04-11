import { Request, Response } from "express";
import prisma from "../../utils/PrismaClient";
const getReceivedDonations = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const donations = await prisma.donation.findMany({
      where: { recipientId: userId },
      orderBy: { timestamp: "desc" },
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Хандивууд авахад алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default getReceivedDonations;
