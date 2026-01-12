import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WorkerService } from './worker.service';

@Injectable()
export class WorkerCron {
  constructor(private readonly workerService: WorkerService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.workerService.publishDueLessons();
  }
}
