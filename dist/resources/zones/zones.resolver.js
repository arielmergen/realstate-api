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
exports.ZonesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const zones_service_1 = require("./zones.service");
const entities_1 = require("../../entities");
let ZonesResolver = class ZonesResolver {
    constructor(zoneService) {
        this.zoneService = zoneService;
    }
    async create(createZoneInput) {
        return await this.zoneService.create(createZoneInput);
    }
    async findAll() {
        return await this.zoneService.findAll();
    }
    async findOne(id) {
        return await this.zoneService.findOne(id);
    }
    async update(id, updateZoneInput) {
        return await this.zoneService.update(id, updateZoneInput);
    }
    async delete(id) {
        return await this.zoneService.delete(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)('createZone'),
    __param(0, (0, graphql_1.Args)('zoneInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.ZoneInput]),
    __metadata("design:returntype", Promise)
], ZonesResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('zones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ZonesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('zone'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZonesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)('updateZone'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('zoneInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.ZoneInput]),
    __metadata("design:returntype", Promise)
], ZonesResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)('deleteZone'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZonesResolver.prototype, "delete", null);
ZonesResolver = __decorate([
    (0, graphql_1.Resolver)('Zone'),
    __metadata("design:paramtypes", [zones_service_1.ZonesService])
], ZonesResolver);
exports.ZonesResolver = ZonesResolver;
//# sourceMappingURL=zones.resolver.js.map