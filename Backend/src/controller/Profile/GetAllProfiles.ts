import prisma from "../../utils/PrismaClient";
import { Request, Response } from "express";

export const getAllProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
      },
    });
    if (profiles.length === 0) {
      res.status(200).json([]); 
      return;
    }
    res.status(200).json(profiles);
  } catch (error: any) {
    console.error("Error fetching all profiles:", error.message, error.stack);
    res.status(500).json({ 
      message: "Server error while fetching profiles",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};