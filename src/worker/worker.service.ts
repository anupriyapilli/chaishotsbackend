// worker/worker.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);

  constructor(private prisma: PrismaService) {}

  @Cron('* * * * *') // every minute
  async publishDueLessons() {
    const now = new Date();
    this.logger.debug(`publishDueLessons tick at ${now.toISOString()}`);

    await this.prisma.$transaction(async (tx) => {
      // 1. find due lessons
      const dueLessons = await tx.lesson.findMany({
        where: {
          status: 'SCHEDULED',
          publishAt: { lte: now },
        },
        select: {
          id: true,
          term: {
            select: { programId: true },
          },
        },
      });

      if (dueLessons.length === 0) return;

      const programIds = new Set<string>();

      // 2. publish lessons (idempotent)
      for (const l of dueLessons) {
        const result = await tx.lesson.updateMany({
          where: {
            id: l.id,
            status: 'SCHEDULED', // only if still scheduled
          },
          data: {
            status: 'PUBLISHED',
            publishedAt: now,
          },
        });

        if (result.count > 0 && l.term?.programId) {
          programIds.add(l.term.programId);
        }
      }

      // 3. ensure programs are published if they now have published lessons
      for (const programId of programIds) {
        const publishedCount = await tx.lesson.count({
          where: {
            term: { programId },
            status: 'PUBLISHED',
          },
        });
        if (publishedCount === 0) continue;

        await tx.program.updateMany({
          where: {
            id: programId,
            status: { not: 'PUBLISHED' },
          },
          data: {
            status: 'PUBLISHED',
            publishedAt: now,
          },
        });
      }
    });

    this.logger.debug('publishDueLessons tick completed');
  }
}
