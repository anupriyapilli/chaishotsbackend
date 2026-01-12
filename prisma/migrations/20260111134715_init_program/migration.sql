/*
  Warnings:

  - The primary key for the `Program` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Program` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProgramStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('EN', 'TE', 'HI', 'AS');

-- DropForeignKey
ALTER TABLE "Term" DROP CONSTRAINT "Term_programId_fkey";

-- AlterTable
ALTER TABLE "Program" DROP CONSTRAINT "Program_pkey",
DROP COLUMN "name",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Program_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Program_id_seq";

-- AlterTable
ALTER TABLE "Term" ALTER COLUMN "programId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Term" ADD CONSTRAINT "Term_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
