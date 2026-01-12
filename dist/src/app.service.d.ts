import { PrismaService } from './prisma/prisma.service';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    getHello(): string;
    getSummary(): Promise<{
        totalUsers: number;
    }>;
    getLatestOrders(): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        customer: string;
        amount: number;
    }[]>;
}
