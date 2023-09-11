/*
  Warnings:

  - You are about to drop the `semester_registration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "semester_registration" DROP CONSTRAINT "semester_registration_academicSemesterId_fkey";

-- DropTable
DROP TABLE "semester_registration";

-- DropEnum
DROP TYPE "SemesterRegistrationStatus";
