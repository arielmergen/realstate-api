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
exports.FeaturesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../../guards");
const decorators_1 = require("../../decorators");
const entities_1 = require("../../entities");
const features_service_1 = require("./features.service");
let FeaturesResolver = class FeaturesResolver {
    constructor(featuresService) {
        this.featuresService = featuresService;
    }
    async create(createFeatureInput) {
        return await this.featuresService.create(createFeatureInput);
    }
    async findAll() {
        return await this.featuresService.findAll();
    }
    async findOne(id) {
        return await this.featuresService.findOne(id);
    }
    async update(id, updateFeatureInput) {
        return await this.featuresService.update(id, updateFeatureInput);
    }
    async delete(id) {
        return await this.featuresService.delete(id);
    }
};
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('createFeature'),
    __param(0, (0, graphql_1.Args)('featureInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.FeatureInput]),
    __metadata("design:returntype", Promise)
], FeaturesResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('features'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeaturesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('feature'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeaturesResolver.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('updateFeature'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('featureInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.UpdateFeatureInput]),
    __metadata("design:returntype", Promise)
], FeaturesResolver.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('deleteFeature'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeaturesResolver.prototype, "delete", null);
FeaturesResolver = __decorate([
    (0, graphql_1.Resolver)('Feature'),
    __metadata("design:paramtypes", [features_service_1.FeaturesService])
], FeaturesResolver);
exports.FeaturesResolver = FeaturesResolver;
//# sourceMappingURL=features.resolver.js.map