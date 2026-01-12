import { PrismaService } from '../prisma/prisma.service';
export declare class WorkerService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    publishDueLessons(): Promise<void>;
}
