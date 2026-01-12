import { PrismaService } from './prisma/prisma.service';
export declare class HealthController {
    private prisma;
    constructor(prisma: PrismaService);
    getHealth(): Promise<{
        status: string;
        db: string;
    }>;
}
