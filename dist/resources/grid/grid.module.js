"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridModule = void 0;
const common_1 = require("@nestjs/common");
const grid_service_1 = require("./grid.service");
const grid_resolver_1 = require("./grid.resolver");
const images_module_1 = require("../images/images.module");
let GridModule = class GridModule {
};
GridModule = __decorate([
    (0, common_1.Module)({
        imports: [images_module_1.ImagesModule],
        providers: [grid_resolver_1.GridResolver, grid_service_1.GridService],
        exports: [grid_service_1.GridService],
    })
], GridModule);
exports.GridModule = GridModule;
//# sourceMappingURL=grid.module.js.map