/*
  Warnings:

  - You are about to drop the `CoursePrerequsite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoursePrerequsite" DROP CONSTRAINT "CoursePrerequsite_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CoursePrerequsite" DROP CONSTRAINT "CoursePrerequsite_preRequsiteId_fkey";

-- DropTable
DROP TABLE "CoursePrerequsite";

-- CreateTable
CREATE TABLE "course_prerequisites" (
    "courseId" TEXT NOT NULL,
    "preRequisiteId" TEXT NOT NULL,

    CONSTRAINT "course_prerequisites_pkey" PRIMARY KEY ("courseId","preRequisiteId")
);

-- AddForeignKey
ALTER TABLE "course_prerequisites" ADD CONSTRAINT "course_prerequisites_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_prerequisites" ADD CONSTRAINT "course_prerequisites_preRequisiteId_fkey" FOREIGN KEY ("preRequisiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
