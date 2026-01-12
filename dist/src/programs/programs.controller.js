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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramsController = void 0;
const common_1 = require("@nestjs/common");
const programs_service_1 = require("./programs.service");
const update_program_dto_1 = require("./dto/update-program.dto");
let ProgramsController = class ProgramsController {
    programsService;
    constructor(programsService) {
        this.programsService = programsService;
    }
    async listPrograms() {
        return this.programsService.findAll();
    }
    async getProgram(id) {
        return this.programsService.findOne(id);
    }
    async updateProgram(id, dto) {
        if (dto.languagesAvailable &&
            dto.languagePrimary &&
            !dto.languagesAvailable.includes(dto.languagePrimary)) {
            throw new common_1.BadRequestException('languagePrimary must be included in languagesAvailable');
        }
        const primaryPosters = dto.assets?.filter((a) => a.language === dto.languagePrimary && a.assetType === 'POSTER');
        const hasPortrait = primaryPosters?.some((a) => a.variant === 'PORTRAIT');
        const hasLandscape = primaryPosters?.some((a) => a.variant === 'LANDSCAPE');
        if (!hasPortrait || !hasLandscape) {
            throw new common_1.BadRequestException('Primary language must have portrait and landscape posters');
        }
        return this.programsService.updateWithAssets(id, dto);
    }
};
exports.ProgramsController = ProgramsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "listPrograms", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "getProgram", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_program_dto_1.UpdateProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramsController.prototype, "updateProgram", null);
exports.ProgramsController = ProgramsController = __decorate([
    (0, common_1.Controller)('programs'),
    __metadata("design:paramtypes", [programs_service_1.ProgramsService])
], ProgramsController);
//# sourceMappingURL=programs.controller.js.map