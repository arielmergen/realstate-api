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
exports.PageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const page_service_1 = require("./page.service");
const entities_1 = require("../../entities");
let PageResolver = class PageResolver {
    constructor(pageService) {
        this.pageService = pageService;
    }
    findAll() {
        return this.pageService.findAll();
    }
    findOne() {
    }
    createPage(createPageInput) {
        return this.pageService.create(createPageInput);
    }
    updatePage() {
    }
    removePage() {
    }
};
__decorate([
    (0, graphql_1.Query)('page'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], PageResolver.prototype, "findAll", null);
__decorate([
    __param(0, (0, graphql_1.Args)('createPageInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.CreatePageInput]),
    __metadata("design:returntype", void 0)
], PageResolver.prototype, "createPage", null);
PageResolver = __decorate([
    (0, graphql_1.Resolver)('Page'),
    __metadata("design:paramtypes", [page_service_1.PageService])
], PageResolver);
exports.PageResolver = PageResolver;
//# sourceMappingURL=page.resolver.js.map