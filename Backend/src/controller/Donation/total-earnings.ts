import { Request, Response } from "express";
import prisma from "../../utils/PrismaClient";
const getTotalEarnings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const total = await prisma.donation.aggregate({
      where: { recipientId: userId },
      _sum: {
        amount: true,
      },
    });

    res.status(200).json({ totalEarnings: total._sum.amount || 0 });
  } catch (error) {
    console.error("Нийт орлого авахад алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};

export default getTotalEarnings;
