import { WorkerService } from './worker.service';
export declare class WorkerCron {
    private readonly workerService;
    constructor(workerService: WorkerService);
    handleCron(): Promise<void>;
}
