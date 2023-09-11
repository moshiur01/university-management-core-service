/*
  Warnings:

  - You are about to drop the column `maximumCredir` on the `semester_registration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "semester_registration" DROP COLUMN "maximumCredir",
ADD COLUMN     "maximumCredit" INTEGER NOT NULL DEFAULT 0;
