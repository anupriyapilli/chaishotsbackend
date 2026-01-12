import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: {
    title: string;
    description?: string;
    languagePrimary: string;
    languagesAvailable: string[];
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  }) {
    if (!data.languagesAvailable.includes(data.languagePrimary)) {
      throw new Error('languagePrimary must be included in languagesAvailable');
    }

    return this.prisma.program.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        languagePrimary: data.languagePrimary,
        languagesAvailable: data.languagesAvailable,
        status: data.status ?? 'DRAFT',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.program.findUnique({ where: { id } });
  }

  async updateWithAssets(id: string, dto: UpdateProgramDto) {
    const { assets = [], ...rest } = dto as any;

    return this.prisma.$transaction(async (tx) => {
      const program = await tx.program.update({
        where: { id },
        data: rest,
      });

      if (assets.length > 0) {
        await tx.programAsset.deleteMany({ where: { programId: id } });
        await tx.programAsset.createMany({
          data: assets.map((a) => ({
            programId: id,
            language: a.language,
            variant: a.variant,
            assetType: a.assetType,
            url: a.url,
          })),
        });
      }

      return program;
    });
  }
}
