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
exports.AmenitiesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/guards/auth.guard");
const guards_1 = require("../../guards");
const decorators_1 = require("../../decorators");
const amenities_service_1 = require("./amenities.service");
const entities_1 = require("../../entities");
let AmenitiesResolver = class AmenitiesResolver {
    constructor(amenitiesService) {
        this.amenitiesService = amenitiesService;
    }
    async create(createAmenityInput) {
        return await this.amenitiesService.create(createAmenityInput);
    }
    async findAll() {
        return await this.amenitiesService.findAll();
    }
    async findOne(id) {
        return await this.amenitiesService.findOne(id);
    }
    async update(id, amenityInput) {
        return await this.amenitiesService.update(id, amenityInput);
    }
    async remove(id) {
        return await this.amenitiesService.delete(id);
    }
};
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('createAmenity'),
    __param(0, (0, graphql_1.Args)('amenityInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.AmenityInput]),
    __metadata("design:returntype", Promise)
], AmenitiesResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('amenities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AmenitiesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('amenity'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AmenitiesResolver.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('updateAmenity'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('amenityInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.AmenityInput]),
    __metadata("design:returntype", Promise)
], AmenitiesResolver.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('deleteAmenity'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AmenitiesResolver.prototype, "remove", null);
AmenitiesResolver = __decorate([
    (0, graphql_1.Resolver)('Amenity'),
    __metadata("design:paramtypes", [amenities_service_1.AmenitiesService])
], AmenitiesResolver);
exports.AmenitiesResolver = AmenitiesResolver;
//# sourceMappingURL=amenities.resolver.js.map