import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfile = async (req: any, res: any): Promise<void> => {
  const { id } = req.params;
  try {
    const profile = await prisma.profile.findUnique(id)
    if (!profile) {
      res.status(404).json({ message: "Profile not found." });
      return;
    }
    res.status(400).json(profile);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: "Server error." });
  }
};
