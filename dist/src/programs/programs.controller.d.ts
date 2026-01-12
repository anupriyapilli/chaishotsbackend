import { ProgramsService } from './programs.service';
import { UpdateProgramDto } from './dto/update-program.dto';
export declare class ProgramsController {
    private readonly programsService;
    constructor(programsService: ProgramsService);
    listPrograms(): Promise<{
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
    getProgram(id: string): Promise<{
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
    updateProgram(id: string, dto: UpdateProgramDto): Promise<{
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
