"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.program.createMany({
        data: [
            {
                id: 'prog-math',
                title: 'Introduction to Telugu Literature',
                description: 'Basics of Telugu literature',
                languagePrimary: 'te',
                languagesAvailable: ['te', 'en'],
                status: client_1.ProgramStatus.DRAFT,
            },
            {
                id: 'prog-tea',
                title: 'Assamese Tea Guide',
                description: 'All about Assamese tea',
                languagePrimary: 'as',
                languagesAvailable: ['as', 'en'],
                status: client_1.ProgramStatus.PUBLISHED,
                publishedAt: new Date(),
            },
        ],
        skipDuplicates: true,
    });
    const topicLang = await prisma.topic.create({
        data: { name: 'language' },
    });
    const topicFood = await prisma.topic.create({
        data: { name: 'food' },
    });
    await prisma.programTopic.createMany({
        data: [
            { programId: 'prog-math', topicId: topicLang.id },
            { programId: 'prog-tea', topicId: topicFood.id },
        ],
        skipDuplicates: true,
    });
    await prisma.programAsset.createMany({
        data: [
            {
                programId: 'prog-math',
                language: 'te',
                variant: 'PORTRAIT',
                assetType: 'POSTER',
                url: 'https://example.com/prog-math-te-portrait.jpg',
            },
            {
                programId: 'prog-math',
                language: 'te',
                variant: 'LANDSCAPE',
                assetType: 'POSTER',
                url: 'https://example.com/prog-math-te-landscape.jpg',
            },
            {
                programId: 'prog-tea',
                language: 'as',
                variant: 'PORTRAIT',
                assetType: 'POSTER',
                url: 'https://example.com/prog-tea-as-portrait.jpg',
            },
            {
                programId: 'prog-tea',
                language: 'as',
                variant: 'LANDSCAPE',
                assetType: 'POSTER',
                url: 'https://example.com/prog-tea-as-landscape.jpg',
            },
        ],
        skipDuplicates: true,
    });
    const term1 = await prisma.term.create({
        data: {
            id: 'term-1',
            programId: 'prog-math',
            termNumber: 1,
            title: 'Term 1',
        },
    });
    const term2 = await prisma.term.create({
        data: {
            id: 'term-2',
            programId: 'prog-tea',
            termNumber: 1,
            title: 'Term 1',
        },
    });
    const now = new Date();
    const soon = new Date(now.getTime() + 2 * 60 * 1000);
    const lesson1 = await prisma.lesson.create({
        data: {
            id: 'lesson-1',
            termId: term1.id,
            lessonNumber: 1,
            title: 'Telugu Alphabets',
            contentType: client_1.ContentType.VIDEO,
            durationMs: 300000,
            isPaid: false,
            contentLanguagePrimary: 'te',
            contentLanguagesAvailable: ['te', 'en'],
            contentUrlsByLanguage: {
                te: 'https://video.example.com/telugu1-te.mp4',
                en: 'https://video.example.com/telugu1-en.mp4',
            },
            subtitleLanguages: ['en'],
            subtitleUrlsByLanguage: {
                en: 'https://subs.example.com/telugu1-en.vtt',
            },
            status: client_1.LessonStatus.PUBLISHED,
            publishAt: now,
            publishedAt: now,
        },
    });
    const lesson2 = await prisma.lesson.create({
        data: {
            id: 'lesson-2',
            termId: term1.id,
            lessonNumber: 2,
            title: 'Telugu Poems',
            contentType: client_1.ContentType.VIDEO,
            durationMs: 420000,
            isPaid: true,
            contentLanguagePrimary: 'te',
            contentLanguagesAvailable: ['te'],
            contentUrlsByLanguage: {
                te: 'https://video.example.com/telugu2-te.mp4',
            },
            subtitleLanguages: [],
            status: client_1.LessonStatus.SCHEDULED,
            publishAt: soon,
        },
    });
    await prisma.lesson.createMany({
        data: [
            {
                id: 'lesson-3',
                termId: term1.id,
                lessonNumber: 3,
                title: 'Grammar Basics',
                contentType: client_1.ContentType.ARTICLE,
                isPaid: false,
                contentLanguagePrimary: 'te',
                contentLanguagesAvailable: ['te'],
                contentUrlsByLanguage: { te: 'https://article.example.com/grammar-te' },
                subtitleLanguages: [],
                status: client_1.LessonStatus.DRAFT,
            },
            {
                id: 'lesson-4',
                termId: term2.id,
                lessonNumber: 1,
                title: 'Tea Types',
                contentType: client_1.ContentType.VIDEO,
                durationMs: 240000,
                isPaid: false,
                contentLanguagePrimary: 'as',
                contentLanguagesAvailable: ['as', 'en'],
                contentUrlsByLanguage: {
                    as: 'https://video.example.com/tea1-as.mp4',
                    en: 'https://video.example.com/tea1-en.mp4',
                },
                subtitleLanguages: ['en'],
                subtitleUrlsByLanguage: {
                    en: 'https://subs.example.com/tea1-en.vtt',
                },
                status: client_1.LessonStatus.PUBLISHED,
                publishAt: now,
                publishedAt: now,
            },
        ],
        skipDuplicates: true,
    });
    await prisma.lessonAsset.createMany({
        data: [
            {
                lessonId: lesson1.id,
                language: 'te',
                variant: 'PORTRAIT',
                assetType: 'THUMBNAIL',
                url: 'https://img.example.com/lesson1-te-portrait.jpg',
            },
            {
                lessonId: lesson1.id,
                language: 'te',
                variant: 'LANDSCAPE',
                assetType: 'THUMBNAIL',
                url: 'https://img.example.com/lesson1-te-landscape.jpg',
            },
            {
                lessonId: lesson2.id,
                language: 'te',
                variant: 'PORTRAIT',
                assetType: 'THUMBNAIL',
                url: 'https://img.example.com/lesson2-te-portrait.jpg',
            },
            {
                lessonId: lesson2.id,
                language: 'te',
                variant: 'LANDSCAPE',
                assetType: 'THUMBNAIL',
                url: 'https://img.example.com/lesson2-te-landscape.jpg',
            },
        ],
        skipDuplicates: true,
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map