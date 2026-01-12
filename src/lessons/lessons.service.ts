import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LessonStatus } from '@prisma/client';

// include everything the frontend PATCHes
type UpdateLessonDto = {
  status?: LessonStatus;
  publishAt?: string | null;
  isPaid?: boolean;
  contentType?: 'VIDEO' | 'ARTICLE';
  durationMs?: number | null;
};
@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async findLatest() {
    return this.prisma.lesson.findFirst({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll() {
    return this.prisma.lesson.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateLessonDto) {
    console.log('PATCH /lessons/:id body:', data);

    try {
      return await this.prisma.lesson.update({
        where: { id },
        data,
      });
    } catch (e) {
      console.error('Error in LessonsService.update', e);
      throw e; // still returns 500, but you now see the real error in the console
    }
  }
}
