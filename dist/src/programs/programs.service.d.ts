import { PrismaService } from '../prisma/prisma.service';
import { UpdateProgramDto } from './dto/update-program.dto';
export declare class ProgramsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        title: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.ProgramStatus;
        publishedAt: Date | null;
        updatedAt: Date;
        description: string | null;
        languagePrimary: string;
        languagesAvailable: string[];
    }[]>;
    create(data: {
        title: string;
        description?: string;
        languagePrimary: string;
        languagesAvailable: string[];
        status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
    }): import("@prisma/client").Prisma.Prisma__ProgramClient<{
        id: string;
        title: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.ProgramStatus;
        publishedAt: Date | null;
        updatedAt: Date;
        description: string | null;
        languagePrimary: string;
        languagesAvailable: string[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.ProgramStatus;
        publishedAt: Date | null;
        updatedAt: Date;
        description: string | null;
        languagePrimary: string;
        languagesAvailable: string[];
    } | null>;
    updateWithAssets(id: string, dto: UpdateProgramDto): Promise<{
        id: string;
        title: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.ProgramStatus;
        publishedAt: Date | null;
        updatedAt: Date;
        description: string | null;
        languagePrimary: string;
        languagesAvailable: string[];
    }>;
}
