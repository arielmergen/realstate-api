"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyTypeModule = void 0;
const common_1 = require("@nestjs/common");
const property_type_service_1 = require("./property-type.service");
const property_type_resolver_1 = require("./property-type.resolver");
let PropertyTypeModule = class PropertyTypeModule {
};
PropertyTypeModule = __decorate([
    (0, common_1.Module)({
        providers: [property_type_resolver_1.PropertyTypeResolver, property_type_service_1.PropertyTypeService],
    })
], PropertyTypeModule);
exports.PropertyTypeModule = PropertyTypeModule;
//# sourceMappingURL=property-type.module.js.map