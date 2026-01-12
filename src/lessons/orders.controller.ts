import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('lessons')
export class LessonsController {
  @Get('latest')
  getLatestLessons() {
    return [
      { id: 1, title: 'Lesson A', status: 'PUBLISHED' },
      { id: 2, title: 'Lesson B', status: 'DRAFT' },
    ];
  }
}
