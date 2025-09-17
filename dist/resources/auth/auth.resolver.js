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
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const decorators_1 = require("../../decorators");
const entities_1 = require("../../entities");
const auth_service_1 = require("./auth.service");
const auth_refresh_guard_1 = require("./guards/auth-refresh.guard");
const auth_guard_1 = require("./guards/auth.guard");
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async login(authInput) {
        return await this.authService.login(authInput);
    }
    async logout(user) {
        return await this.authService.logout(user);
    }
    async register(userInput) {
        return await this.authService.register(userInput);
    }
    async googleLogin() {
        return await this.authService.googleLogin();
    }
    async refresh(refreshInput, user) {
        return await this.authService.refresh(user, refreshInput);
    }
    async updateSession(refreshInput, user) {
        return await this.authService.updateSession(user, refreshInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)('login'),
    __param(0, (0, graphql_1.Args)('authInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.AuthInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_refresh_guard_1.JwtRefreshAuthGuard),
    (0, graphql_1.Mutation)('logout'),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.UserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
__decorate([
    (0, graphql_1.Mutation)('register'),
    __param(0, (0, graphql_1.Args)('userInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.RegisterUserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)('googleLogin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "googleLogin", null);
__decorate([
    (0, common_1.UseGuards)(auth_refresh_guard_1.JwtRefreshAuthGuard),
    (0, graphql_1.Mutation)('refresh'),
    __param(0, (0, graphql_1.Args)('refreshInput')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.RefreshInput,
        entities_1.User]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)('updateSession'),
    __param(0, (0, graphql_1.Args)('refreshInput')),
    __param(1, (0, graphql_1.Args)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.RefreshInput,
        entities_1.UserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "updateSession", null);
AuthResolver = __decorate([
    (0, graphql_1.Resolver)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map