"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProgramsService = class ProgramsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.program.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    create(data) {
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
    async findOne(id) {
        return this.prisma.program.findUnique({ where: { id } });
    }
    async updateWithAssets(id, dto) {
        const { assets = [], ...rest } = dto;
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
};
exports.ProgramsService = ProgramsService;
exports.ProgramsService = ProgramsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgramsService);
//# sourceMappingURL=programs.service.js.map