import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [WorkerService, PrismaService],
})
export class WorkerModule {}
