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
exports.ImagesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const guards_1 = require("../../guards");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../auth/guards/auth.guard");
const images_service_1 = require("./images.service");
const entities_1 = require("../../entities");
let ImagesResolver = class ImagesResolver {
    constructor(imageService) {
        this.imageService = imageService;
    }
    async create(createImageInput) {
        return await this.imageService.create(createImageInput);
    }
    async findAll() {
        return await this.imageService.findAll();
    }
    async findOne(id) {
        return await this.imageService.findOne(id);
    }
    async delete(publicId) {
        return await this.imageService.delete(publicId);
    }
};
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('createImage'),
    __param(0, (0, graphql_1.Args)('imageInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.CreateImageInput]),
    __metadata("design:returntype", Promise)
], ImagesResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('images'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ImagesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('image'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImagesResolver.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('deleteImage'),
    __param(0, (0, graphql_1.Args)('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImagesResolver.prototype, "delete", null);
ImagesResolver = __decorate([
    (0, graphql_1.Resolver)('Image'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesResolver);
exports.ImagesResolver = ImagesResolver;
//# sourceMappingURL=images.resolver.js.map