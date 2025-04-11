/*
  Warnings:

  - You are about to drop the `_UserTobankCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserTobankCard" DROP CONSTRAINT "_UserTobankCard_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTobankCard" DROP CONSTRAINT "_UserTobankCard_B_fkey";

-- DropTable
DROP TABLE "_UserTobankCard";

-- AddForeignKey
ALTER TABLE "bankCard" ADD CONSTRAINT "bankCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
