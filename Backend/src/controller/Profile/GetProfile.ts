import { Request, Response } from "express";
import prisma from "../../utils/PrismaClient";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      res.status(404).json({ message: "Profile not found." });
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: (error as Error).message,
    });
  }
};