-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "termId" TEXT,
    "lessonNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "publishAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lesson_status_publishAt_idx" ON "Lesson"("status", "publishAt");
