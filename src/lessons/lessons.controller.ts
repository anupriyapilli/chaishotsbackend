import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LessonsService } from './lessons.service';
import { LessonStatus } from '@prisma/client';

type UpdateLessonDto = {
  status?: LessonStatus;
  publishAt?: string | null;
  isPaid?: boolean;
  contentType?: 'VIDEO' | 'ARTICLE';
  durationMs?: number | null;
};

@UseGuards(AuthGuard('jwt'))
@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @Get('latest')
  getLatest() {
    return this.lessonsService.findLatest();
  }

  @Get()
  getAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  updateLesson(
    @Param('id') id: string,
    @Body() body: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, body);
  }
}
