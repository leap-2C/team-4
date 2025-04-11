
import prisma from "../../utils/PrismaClient";
import { Request, Response, NextFunction } from "express";

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await prisma.user.delete({
      where: { id: id },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
