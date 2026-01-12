/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Program` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `languagePrimary` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "languagePrimary" "LanguageCode" NOT NULL,
ADD COLUMN     "languageSecondary" "LanguageCode",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "ProgramStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");
