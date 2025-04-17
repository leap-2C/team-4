
import prisma from "../../utils/PrismaClient";
import { Request, Response } from "express";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, about, avatarImage , socialMediaURL , backgroundImage, successMessage } = req.body;

    if (!id || !name) {
      res.status(400).json({ message: "User ID, and name are required." });
      return;
    }

    const newProfile = await prisma.profile.create({
      data: {
        id,
        name,
        about,
        avatarImage,
        socialMediaURL,
        backgroundImage,
        successMessage
      },
    });
    

    res.status(400).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: "Server error." });
  }
};
