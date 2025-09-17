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
exports.NeighborhoodResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const guards_1 = require("../../guards");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../auth/guards/auth.guard");
const neighborhood_service_1 = require("./neighborhood.service");
const entities_1 = require("../../entities");
let NeighborhoodResolver = class NeighborhoodResolver {
    constructor(neighborhoodService) {
        this.neighborhoodService = neighborhoodService;
    }
    async create(createNeighborhoodInput) {
        return await this.neighborhoodService.create(createNeighborhoodInput);
    }
    async findAll(associatedEntrepreneurshipId) {
        return await this.neighborhoodService.findAll(associatedEntrepreneurshipId);
    }
    async findOne(id) {
        return await this.neighborhoodService.findOne(id);
    }
    async update(id, updateNeighborhoodInput) {
        return await this.neighborhoodService.update(id, updateNeighborhoodInput);
    }
    async delete(id) {
        return await this.neighborhoodService.delete(id);
    }
};
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('createNeighborhood'),
    __param(0, (0, graphql_1.Args)('neighborhoodInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.NeighborhoodInput]),
    __metadata("design:returntype", Promise)
], NeighborhoodResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('neighborhoods'),
    __param(0, (0, graphql_1.Args)('associatedEntrepreneurship')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NeighborhoodResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('neighborhood'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NeighborhoodResolver.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('updateNeighborhood'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('neighborhoodInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.NeighborhoodInput]),
    __metadata("design:returntype", Promise)
], NeighborhoodResolver.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('deleteNeighborhood'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NeighborhoodResolver.prototype, "delete", null);
NeighborhoodResolver = __decorate([
    (0, graphql_1.Resolver)('Neighborhood'),
    __metadata("design:paramtypes", [neighborhood_service_1.NeighborhoodService])
], NeighborhoodResolver);
exports.NeighborhoodResolver = NeighborhoodResolver;
//# sourceMappingURL=neighborhood.resolver.js.map