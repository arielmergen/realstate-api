"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesModule = void 0;
const common_1 = require("@nestjs/common");
const features_service_1 = require("./features.service");
const features_resolver_1 = require("./features.resolver");
const images_module_1 = require("../images/images.module");
const slider_module_1 = require("../slider/slider.module");
const grid_module_1 = require("../grid/grid.module");
let FeaturesModule = class FeaturesModule {
};
FeaturesModule = __decorate([
    (0, common_1.Module)({
        imports: [images_module_1.ImagesModule, slider_module_1.SliderModule, grid_module_1.GridModule],
        providers: [features_resolver_1.FeaturesResolver, features_service_1.FeaturesService],
    })
], FeaturesModule);
exports.FeaturesModule = FeaturesModule;
//# sourceMappingURL=features.module.js.map