import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { Request, Response } from "express";

 export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id,  name, about, avatarImage } = req.body;

    if (!name) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    const updatedProfile = await prisma.profile.update({
      where: {
        id: req.params.id,
      },
      data: {
        id,
        name,
        about,
        avatarImage
      },
    });

    res.status(400).json(updatedProfile);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Server error." });
  }
};
