import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createUser(email: string, passwordHash: string, role: Role): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
}
