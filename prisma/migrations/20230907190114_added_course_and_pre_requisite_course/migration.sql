-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursePrerequsite" (
    "courseId" TEXT NOT NULL,
    "preRequsiteId" TEXT NOT NULL,

    CONSTRAINT "CoursePrerequsite_pkey" PRIMARY KEY ("courseId","preRequsiteId")
);

-- AddForeignKey
ALTER TABLE "CoursePrerequsite" ADD CONSTRAINT "CoursePrerequsite_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePrerequsite" ADD CONSTRAINT "CoursePrerequsite_preRequsiteId_fkey" FOREIGN KEY ("preRequsiteId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
