import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getLatestOrders(): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        customer: string;
        amount: number;
    }[]>;
}
