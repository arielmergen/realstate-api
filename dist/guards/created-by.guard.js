"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedByGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let CreatedByGuard = class CreatedByGuard {
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        const user = req.user;
        console.info(user.email, req);
        return true;
    }
};
CreatedByGuard = __decorate([
    (0, common_1.Injectable)()
], CreatedByGuard);
exports.CreatedByGuard = CreatedByGuard;
//# sourceMappingURL=created-by.guard.js.map