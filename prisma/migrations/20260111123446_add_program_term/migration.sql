/*
  Warnings:

  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `publishAt` on the `Lesson` table. All the data in the column will be lost.
  - The `id` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `termId` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "Lesson_status_publishAt_idx";

-- AlterTable
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_pkey",
DROP COLUMN "publishAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "termId",
ADD COLUMN     "termId" INTEGER,
ALTER COLUMN "status" DROP DEFAULT,
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "programId" INTEGER NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE SET NULL ON UPDATE CASCADE;
