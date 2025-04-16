/*
  Warnings:

  - Added the required column `CVV` to the `bankCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CardNumber` to the `bankCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bankCard" ADD COLUMN     "CVV" TEXT NOT NULL,
ADD COLUMN     "CardNumber" TEXT NOT NULL;
