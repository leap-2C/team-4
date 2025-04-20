import prisma from "../../utils/PrismaClient";
import { Request, Response } from "express";


interface CustomRequest extends Request {
  file?: Express.Multer.File;
}
import cloudinary from "../../utils/cloudinary";

export const updateProfile = async (
  req: CustomRequest,
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

    let imageUrl = backgroundImage || "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Profile",
      });
      imageUrl = result.secure_url;
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
        backgroundImage: imageUrl,
        successMessage,
      },
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error." });
  }
};
