import prisma from "../../utils/PrismaClient";
import { Request, Response } from "express";

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      id,
      name,
      about,
      avatarImage,
      socialMediaURL,
      backgroundImage,
      successMessage,
    } = req.body;

    if (!id) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    const updatedProfile = await prisma.profile.update({
      where: {
        id: id, 
      },
      data: {
        name,
        about,
        avatarImage,
        socialMediaURL,
        backgroundImage,
        successMessage,
      },
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error." });
  }
};
