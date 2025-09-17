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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../../entities");
const prisma_service_1 = require("../../db/prisma.service");
let RolesService = class RolesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoleInput) {
        return await this.prisma.role.create({ data: createRoleInput });
    }
    async findAll() {
        const roles = await this.prisma.role.findMany();
        return roles.filter((role) => role.name !== entities_1.RolesName.Owner);
    }
    async findOne(id) {
        return await this.prisma.role.findUnique({ where: { id } });
    }
    async findGuestRole() {
        return await this.prisma.role.findFirst({
            where: { name: entities_1.RolesName.Guest },
        });
    }
    async findOwnerRole() {
        return await this.prisma.role.findFirst({
            where: { name: entities_1.RolesName.Owner },
        });
    }
    async update(id, updateRoleInput) {
        return await this.prisma.role.update({
            where: { id },
            data: updateRoleInput,
        });
    }
    async delete(id) {
        return await this.prisma.role.delete({ where: { id } });
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
exports.RolesService = RolesService;
//# sourceMappingURL=roles.service.js.map