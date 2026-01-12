import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getSummary() {
    const totalUsers = await this.prisma.user.count();
    return { totalUsers };
  }

  async getLatestOrders() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }
}
