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
exports.HomeConfigurationResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const guards_1 = require("../../guards");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../auth/guards/auth.guard");
const home_configuration_service_1 = require("./home-configuration.service");
const entities_1 = require("../../entities");
let HomeConfigurationResolver = class HomeConfigurationResolver {
    constructor(homeConfigurationService) {
        this.homeConfigurationService = homeConfigurationService;
    }
    async create(createHomeConfigurationInput) {
        return await this.homeConfigurationService.create(createHomeConfigurationInput);
    }
    async findAll() {
        return await this.homeConfigurationService.findAll();
    }
    async findOne(id) {
        return await this.homeConfigurationService.findOne(id);
    }
    async update(id, updateHomeConfigurationInput) {
        return await this.homeConfigurationService.update(id, updateHomeConfigurationInput);
    }
    async delete(id) {
        return await this.homeConfigurationService.delete(id);
    }
};
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('createHomeConfiguration'),
    __param(0, (0, graphql_1.Args)('homeConfigurationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.HomeConfigurationInput]),
    __metadata("design:returntype", Promise)
], HomeConfigurationResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('homeConfigurations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeConfigurationResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('homeConfiguration'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeConfigurationResolver.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('updateHomeConfiguration'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('homeConfigurationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.UpdateHomeConfigurationInput]),
    __metadata("design:returntype", Promise)
], HomeConfigurationResolver.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Owner),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('deleteHomeConfiguration'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HomeConfigurationResolver.prototype, "delete", null);
HomeConfigurationResolver = __decorate([
    (0, graphql_1.Resolver)('HomeConfiguration'),
    __metadata("design:paramtypes", [home_configuration_service_1.HomeConfigurationService])
], HomeConfigurationResolver);
exports.HomeConfigurationResolver = HomeConfigurationResolver;
//# sourceMappingURL=home-configuration.resolver.js.map