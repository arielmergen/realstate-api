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
exports.RolesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../../guards");
const decorators_1 = require("../../decorators");
const roles_service_1 = require("./roles.service");
const entities_1 = require("../../entities");
let RolesResolver = class RolesResolver {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async create(createRoleInput) {
        return await this.rolesService.create(createRoleInput);
    }
    async findAll() {
        return await this.rolesService.findAll();
    }
    async findOne(id) {
        return await this.rolesService.findOne(id);
    }
    async update(id, updateRoleInput) {
        return await this.rolesService.update(id, updateRoleInput);
    }
    async delete(id) {
        return await this.rolesService.delete(id);
    }
};
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Owner),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('createRole'),
    __param(0, (0, graphql_1.Args)('roleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.RoleInput]),
    __metadata("design:returntype", Promise)
], RolesResolver.prototype, "create", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Query)('roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolesResolver.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Query)('role'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesResolver.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Owner),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('updateRole'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('roleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.RoleInput]),
    __metadata("design:returntype", Promise)
], RolesResolver.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Owner),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('deleteRole'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesResolver.prototype, "delete", null);
RolesResolver = __decorate([
    (0, graphql_1.Resolver)('Role'),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesResolver);
exports.RolesResolver = RolesResolver;
//# sourceMappingURL=roles.resolver.js.map