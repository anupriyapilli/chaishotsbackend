/*
  Warnings:

  - The primary key for the `Lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `status` column on the `Lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `languageSecondary` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Program` table. All the data in the column will be lost.
  - The primary key for the `Term` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Term` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[termId,lessonNumber]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[programId,termNumber]` on the table `Term` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentLanguagePrimary` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentType` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentUrlsByLanguage` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Made the column `termId` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `title` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `languagePrimary` on the `Program` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `termNumber` to the `Term` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('VIDEO', 'ARTICLE');

-- CreateEnum
CREATE TYPE "LessonStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AssetVariant" AS ENUM ('PORTRAIT', 'LANDSCAPE', 'SQUARE', 'BANNER');

-- CreateEnum
CREATE TYPE "ProgramAssetType" AS ENUM ('POSTER');

-- CreateEnum
CREATE TYPE "LessonAssetType" AS ENUM ('THUMBNAIL', 'SUBTITLE');

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_termId_fkey";

-- DropIndex
DROP INDEX "Program_slug_key";

-- AlterTable
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_pkey",
ADD COLUMN     "contentLanguagePrimary" TEXT NOT NULL,
ADD COLUMN     "contentLanguagesAvailable" TEXT[],
ADD COLUMN     "contentType" "ContentType" NOT NULL,
ADD COLUMN     "contentUrlsByLanguage" JSONB NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "durationMs" INTEGER,
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishAt" TIMESTAMP(3),
ADD COLUMN     "subtitleLanguages" TEXT[],
ADD COLUMN     "subtitleUrlsByLanguage" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "LessonStatus" NOT NULL DEFAULT 'DRAFT',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "termId" SET NOT NULL,
ALTER COLUMN "termId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Lesson_id_seq";

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "languageSecondary",
DROP COLUMN "name",
DROP COLUMN "slug",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "languagesAvailable" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "languagePrimary",
ADD COLUMN     "languagePrimary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Term" DROP CONSTRAINT "Term_pkey",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "termNumber" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Term_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Term_id_seq";

-- DropEnum
DROP TYPE "LanguageCode";

-- CreateTable
CREATE TABLE "AppRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AppRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramTopic" (
    "programId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,

    CONSTRAINT "ProgramTopic_pkey" PRIMARY KEY ("programId","topicId")
);

-- CreateTable
CREATE TABLE "ProgramAsset" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "variant" "AssetVariant" NOT NULL,
    "assetType" "ProgramAssetType" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ProgramAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonAsset" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "variant" "AssetVariant" NOT NULL,
    "assetType" "LessonAssetType" NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "LessonAsset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppRole_name_key" ON "AppRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE INDEX "ProgramTopic_programId_idx" ON "ProgramTopic"("programId");

-- CreateIndex
CREATE INDEX "ProgramTopic_topicId_idx" ON "ProgramTopic"("topicId");

-- CreateIndex
CREATE INDEX "ProgramAsset_programId_language_idx" ON "ProgramAsset"("programId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramAsset_programId_language_variant_assetType_key" ON "ProgramAsset"("programId", "language", "variant", "assetType");

-- CreateIndex
CREATE INDEX "LessonAsset_lessonId_language_idx" ON "LessonAsset"("lessonId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "LessonAsset_lessonId_language_variant_assetType_key" ON "LessonAsset"("lessonId", "language", "variant", "assetType");

-- CreateIndex
CREATE INDEX "Lesson_status_publishAt_idx" ON "Lesson"("status", "publishAt");

-- CreateIndex
CREATE INDEX "Lesson_termId_lessonNumber_idx" ON "Lesson"("termId", "lessonNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_termId_lessonNumber_key" ON "Lesson"("termId", "lessonNumber");

-- CreateIndex
CREATE INDEX "Program_status_languagePrimary_publishedAt_idx" ON "Program"("status", "languagePrimary", "publishedAt");

-- CreateIndex
CREATE INDEX "Term_programId_idx" ON "Term"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "Term_programId_termNumber_key" ON "Term"("programId", "termNumber");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "AppRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramTopic" ADD CONSTRAINT "ProgramTopic_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramTopic" ADD CONSTRAINT "ProgramTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_termId_fkey" FOREIGN KEY ("termId") REFERENCES "Term"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramAsset" ADD CONSTRAINT "ProgramAsset_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAsset" ADD CONSTRAINT "LessonAsset_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
