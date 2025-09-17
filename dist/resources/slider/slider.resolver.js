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
exports.SliderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const guards_1 = require("../../guards");
const decorators_1 = require("../../decorators");
const auth_guard_1 = require("../auth/guards/auth.guard");
const entities_1 = require("../../entities");
const slider_service_1 = require("./slider.service");
let SliderResolver = class SliderResolver {
    constructor(sliderService) {
        this.sliderService = sliderService;
    }
    async create(createSliderInput) {
        return await this.sliderService.create(Object.assign(Object.assign({}, createSliderInput), { imageFolder: '' }));
    }
    async findAll() {
        return await this.sliderService.findAll();
    }
    async findOne(id) {
        return await this.sliderService.findOne(id);
    }
    async update(id, updateSliderInput) {
        return this.sliderService.update(id, Object.assign(Object.assign({}, updateSliderInput), { imageFolder: '' }));
    }
    async delete(id) {
        return await this.sliderService.delete(id);
    }
};
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('createSlider'),
    __param(0, (0, graphql_1.Args)('sliderInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.SliderInput]),
    __metadata("design:returntype", Promise)
], SliderResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('sliders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SliderResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('slider'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SliderResolver.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Executive, entities_1.RolesName.Admin),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('updateSlider'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('sliderInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, entities_1.UpdateSliderInput]),
    __metadata("design:returntype", Promise)
], SliderResolver.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(entities_1.RolesName.Owner),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, graphql_1.Mutation)('deleteSlider'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SliderResolver.prototype, "delete", null);
SliderResolver = __decorate([
    (0, graphql_1.Resolver)('Slider'),
    __metadata("design:paramtypes", [slider_service_1.SliderService])
], SliderResolver);
exports.SliderResolver = SliderResolver;
//# sourceMappingURL=slider.resolver.js.map