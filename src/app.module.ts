import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProgramsModule } from './programs/programs.module';
import { LessonsModule } from './lessons/lessons.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkerModule } from './worker/worker.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    ProgramsModule,
    LessonsModule,
    WorkerModule,   // <— added here
  ],
})
export class AppModule {}
