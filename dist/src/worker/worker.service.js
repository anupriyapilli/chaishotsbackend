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
var WorkerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let WorkerService = WorkerService_1 = class WorkerService {
    prisma;
    logger = new common_1.Logger(WorkerService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async publishDueLessons() {
        const now = new Date();
        this.logger.debug(`publishDueLessons tick at ${now.toISOString()}`);
        await this.prisma.$transaction(async (tx) => {
            const dueLessons = await tx.lesson.findMany({
                where: {
                    status: 'SCHEDULED',
                    publishAt: { lte: now },
                },
                select: {
                    id: true,
                    term: {
                        select: { programId: true },
                    },
                },
            });
            if (dueLessons.length === 0)
                return;
            const programIds = new Set();
            for (const l of dueLessons) {
                const result = await tx.lesson.updateMany({
                    where: {
                        id: l.id,
                        status: 'SCHEDULED',
                    },
                    data: {
                        status: 'PUBLISHED',
                        publishedAt: now,
                    },
                });
                if (result.count > 0 && l.term?.programId) {
                    programIds.add(l.term.programId);
                }
            }
            for (const programId of programIds) {
                const publishedCount = await tx.lesson.count({
                    where: {
                        term: { programId },
                        status: 'PUBLISHED',
                    },
                });
                if (publishedCount === 0)
                    continue;
                await tx.program.updateMany({
                    where: {
                        id: programId,
                        status: { not: 'PUBLISHED' },
                    },
                    data: {
                        status: 'PUBLISHED',
                        publishedAt: now,
                    },
                });
            }
        });
        this.logger.debug('publishDueLessons tick completed');
    }
};
exports.WorkerService = WorkerService;
__decorate([
    (0, schedule_1.Cron)('* * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkerService.prototype, "publishDueLessons", null);
exports.WorkerService = WorkerService = WorkerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkerService);
//# sourceMappingURL=worker.service.js.map