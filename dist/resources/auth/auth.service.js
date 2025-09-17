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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const apollo_server_express_1 = require("apollo-server-express");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../db/prisma.service");
const roles_constants_1 = require("../roles/roles.constants");
const users_service_1 = require("../users/users.service");
const roles_service_1 = require("../roles/roles.service");
const images_service_1 = require("../images/images.service");
let AuthService = class AuthService {
    constructor(prisma, usersService, rolesService, jwt, config, imagesService) {
        this.prisma = prisma;
        this.usersService = usersService;
        this.rolesService = rolesService;
        this.jwt = jwt;
        this.config = config;
        this.imagesService = imagesService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { role: true, picture: true },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password: _ } = user, userData = __rest(user, ["password"]);
            return userData;
        }
        return null;
    }
    async logout(user) {
        const _user = await this.usersService.findOne(user.id);
        if (!_user)
            throw new apollo_server_express_1.AuthenticationError('El usuario no existe');
        const { role: _1, picture: _2 } = _user, cuttedUser = __rest(_user, ["role", "picture"]);
        await this.usersService.update(Object.assign(Object.assign({}, cuttedUser), { refreshToken: null }), { validateRole: false });
        return null;
    }
    async login({ email, password }) {
        const user = await this.prisma.user.findUnique({
            where: { email },
            include: { role: true, picture: true },
        });
        if (!user)
            throw new Error('El usuario no existe');
        const _a = user, { password: _1, pictureId: _2, roleId: _3 } = _a, userWithoutPassword = __rest(_a, ["password", "pictureId", "roleId"]);
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual)
            throw new Error('La contraseña es incorrecta');
        const tokens = await this.createTokens(Object.assign(Object.assign({}, userWithoutPassword), { id: `${user.id}` }));
        await this.usersService.update({
            id: user.id,
            refreshToken: tokens.refreshToken,
            email: user.email,
        }, { validateRole: false });
        return tokens;
    }
    async googleLogin() {
        return { accessToken: '', refreshToken: '' };
    }
    async register(_a) {
        var { email, password, id: _, picture } = _a, userData = __rest(_a, ["email", "password", "id", "picture"]);
        let _picture;
        const SALT_OR_ROUNDS = 12;
        const hashedPassword = await bcrypt
            .hash(password, SALT_OR_ROUNDS)
            .catch((err) => {
            throw err;
        });
        const emailAlreadyInUse = await this.usersService.findOneByEmail(email);
        if (emailAlreadyInUse)
            throw new Error('El correo electrónico se encuentra en uso');
        const guestRole = await this.rolesService.findGuestRole();
        if (picture)
            _picture = await this.imagesService.create(picture, '/users');
        const user = await this.prisma.user.create({
            data: Object.assign(Object.assign(Object.assign({}, userData), { email, role: Object.assign({}, (guestRole && guestRole.id
                    ? {
                        connect: {
                            id: guestRole.id,
                        },
                    }
                    : {
                        create: roles_constants_1.DEFAULT_ROLE,
                    })), password: hashedPassword }), ((_picture === null || _picture === void 0 ? void 0 : _picture.id) && { picture: { connect: { id: _picture.id } } })),
            include: {
                role: true,
                picture: true,
            },
        });
        const { password: _1, roleId: _2, id } = user, userCutted = __rest(user, ["password", "roleId", "id"]);
        const { accessToken, refreshToken } = await this.createTokens(Object.assign(Object.assign({}, userCutted), { id: `${id}` }));
        await this.usersService.update({
            id,
            refreshToken,
            email: userCutted.email,
        });
        return { accessToken, refreshToken };
    }
    async refreshSession(user, refreshInput) {
        const _user = await this.usersService.findOne(user.id);
        if (!_user)
            throw new Error('User not found');
        if (_user.refreshToken !== refreshInput.refreshToken) {
            await this.usersService.update({
                id: user.id,
                email: _user.email,
                refreshToken: null,
            }, { validateRole: false });
            throw new Error('Session could not be refreshed');
        }
        const _a = _user, { id, exp: _, password: _1, roleId: _2, pictureId: _3, refreshToken: _4 } = _a, userCutted = __rest(_a, ["id", "exp", "password", "roleId", "pictureId", "refreshToken"]);
        const tokens = await this.createTokens(Object.assign(Object.assign({}, userCutted), { id: `${id}` }));
        return tokens;
    }
    async refresh(user, refreshInput) {
        const tokens = await this.refreshSession(user, refreshInput);
        await this.usersService.update({
            id: user.id,
            email: user.email,
            refreshToken: tokens.refreshToken,
        }, { validateRole: false });
        return tokens;
    }
    async updateSession(user, refreshInput) {
        const _user = await this.usersService.update(Object.assign(Object.assign({}, user), (typeof user.role === 'string' && { role: user.role })), { validateRole: false, imageFolder: '/users' });
        const tokens = await this.refreshSession(_user, refreshInput);
        await this.usersService.update({
            id: _user.id,
            email: _user.email,
            refreshToken: tokens.refreshToken,
        }, { validateRole: false });
        return tokens;
    }
    async createTokens(userCutted) {
        const accessToken = this.jwt.sign(userCutted, {
            expiresIn: `${this.config.get('TOKEN_VALIDITY_TIME')}${this.config.get('TOKEN_VALIDITY_UNITS')}`,
        });
        const refreshToken = this.jwt.sign({}, {
            expiresIn: `${this.config.get('REFRESH_TOKEN_VALIDITY_TIME')}${this.config.get('REFRESH_TOKEN_VALIDITY_UNITS')}`,
        });
        return { accessToken, refreshToken };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        users_service_1.UsersService,
        roles_service_1.RolesService,
        jwt_1.JwtService,
        config_1.ConfigService,
        images_service_1.ImagesService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map