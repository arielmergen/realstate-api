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
exports.PropertiesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../../guards");
const decorators_1 = require("../../decorators");
const properties_service_1 = require("./properties.service");
const entities_1 = require("../../entities");
let PropertiesResolver = class PropertiesResolver {
    constructor(propertiesService) {
        this.propertiesService = propertiesService;
    }
    async create(createPropertyInput) {
        return await this.propertiesService.create(createPropertyInput);
    }
    async findAll(filters, first, after) {
        return await this.propertiesService.findAll(filters, first, after);
    }
    async findOne(id) {
        return await this.propertiesService.findOne(id);
    }
    async update(id, updatePropertyInput) {
        return await this.propertiesService.update(id, updatePropertyInput);
    }
    async delete(id) {
        return await this.propertiesService.delete(id);
    }
};
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('createProperty'),
    __param(0, (0, graphql_1.Args)('propertyInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.PropertyInput]),
    __metadata("design:returntype", Promise)
], PropertiesResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('properties'),
    __param(0, (0, graphql_1.Args)('filters')),
    __param(1, (0, graphql_1.Args)('first')),
    __param(2, (0, graphql_1.Args)('after')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.PropertyFiltersInput, Number, String]),
    __metadata("design:returntype", Promise)
], PropertiesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('property'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesResolver.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('updateProperty'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('propertyInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.PropertyInput]),
    __metadata("design:returntype", Promise)
], PropertiesResolver.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard, guards_1.CreatedByGuard),
    (0, graphql_1.Mutation)('deleteProperty'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PropertiesResolver.prototype, "delete", null);
PropertiesResolver = __decorate([
    (0, graphql_1.Resolver)('Property'),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService])
], PropertiesResolver);
exports.PropertiesResolver = PropertiesResolver;
//# sourceMappingURL=properties.resolver.js.map