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
exports.LessonsController = void 0;
const common_1 = require("@nestjs/common");
let LessonsController = class LessonsController {
    getLatestLessons() {
        return [
            { id: 1, title: 'Lesson A', status: 'PUBLISHED' },
            { id: 2, title: 'Lesson B', status: 'DRAFT' },
        ];
    }
};
exports.LessonsController = LessonsController;
__decorate([
    (0, common_1.Get)('latest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonsController.prototype, "getLatestLessons", null);
exports.LessonsController = LessonsController = __decorate([
    (0, common_1.Controller)('lessons')
], LessonsController);
//# sourceMappingURL=orders.controller.js.map