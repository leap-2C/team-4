import { Request, Response } from "express";
import prisma from "../../utils/PrismaClient";

export const createProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, about, avatarImage, socialMediaURL, backgroundImage } =
      req.body;

 
    if (!id || !name) {
      res
        .status(400)
        .json({ message: "Хэрэглэгчийн ID болон нэр шаардлагатай." });
      return;
    }


    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      res.status(404).json({ message: "Хэрэглэгч олдсонгүй." });
      return;
    }


    const existingProfile = await prisma.profile.findUnique({ where: { id } });
    if (existingProfile) {
      res
        .status(400)
        .json({ message: "Профайл аль хэдийн бүртгэгдсэн байна." });
      return;
    }

    

  
    const newProfile = await prisma.profile.create({
      data: {
        id,
        name,
        about: about || "",
        avatarImage: avatarImage || "",
        socialMediaURL: socialMediaURL || "",
        backgroundImage: backgroundImage || "",
        successMessage: "Profile created successfully", 
      },
    });

    res.status(201).json({
      message: "Профайл амжилттай үүслээ.",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Алдаа:", error);
    res.status(500).json({ message: "Серверийн алдаа." });
  }
};
