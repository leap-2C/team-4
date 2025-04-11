
import prisma from "../../utils/PrismaClient";
import { Request, Response } from "express";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, about, avatarImage } = req.body;

    if (!id || !name) {
      res.status(400).json({ message: "User ID, and name are required." });
      return;
    }

    const newProfile = await prisma.profile.create({
      where: {
        id: req.params.id,
      },
      data: {
        id,
        name,
        about,
        avatarImage,
      },
    });

    res.status(400).json(newProfile);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Server error." });
  }
};
