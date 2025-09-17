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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma.service");
const entities_1 = require("../../entities");
const bcrypt = require("bcrypt");
const images_service_1 = require("../images/images.service");
let UsersService = class UsersService {
    constructor(prisma, imagesService) {
        this.prisma = prisma;
        this.imagesService = imagesService;
        this.include = {
            role: true,
            picture: true,
        };
    }
    async findAll() {
        const users = await this.prisma.user.findMany({ include: this.include });
        return users.map((_a) => {
            var { refreshToken: _1, roleId: _2, pictureId: _3, password: _4 } = _a, user = __rest(_a, ["refreshToken", "roleId", "pictureId", "password"]);
            return user;
        });
    }
    async findOneByEmail(email) {
        const _user = await this.prisma.user.findUnique({
            where: { email },
            include: this.include,
        });
        if (!_user)
            return null;
        const { password } = _user, user = __rest(_user, ["password"]);
        return user;
    }
    async findOne(id) {
        const _user = await this.prisma.user.findUnique({
            where: { id },
            include: this.include,
        });
        if (!_user)
            return null;
        const { password: _1 } = _user, user = __rest(_user, ["password"]);
        return user;
    }
    async update(_a, _b) {
        var { password, newPassword, role, picture, oldPicture } = _a, userData = __rest(_a, ["password", "newPassword", "role", "picture", "oldPicture"]);
        var _c = _b === void 0 ? { validateRole: true } : _b, validateRole = _c.validateRole, imageFolder = _c.imageFolder;
        const SALT_OR_ROUNDS = 12;
        let newHashedPassword = '';
        let _role;
        let _picture;
        const _user = await this.prisma.user.findUnique({
            where: { id: userData.id },
            include: this.include,
        });
        if (role)
            _role = await this.prisma.role.findUnique({ where: { id: role } });
        if (validateRole && (_user === null || _user === void 0 ? void 0 : _user.role.name) === entities_1.RolesName.Owner)
            throw new Error('You cannot modify owner users!');
        if ((_role === null || _role === void 0 ? void 0 : _role.name) === entities_1.RolesName.Owner)
            throw new Error('Watch out...');
        if (userData.email &&
            userData.email !== (_user === null || _user === void 0 ? void 0 : _user.email) &&
            (await this.findOneByEmail(userData.email)))
            throw new Error('El email esta en uso.');
        if (password &&
            (_user === null || _user === void 0 ? void 0 : _user.password) &&
            !(await bcrypt.compare(password, _user.password)))
            throw new Error('Password does not match');
        if (newPassword && password)
            newHashedPassword = await bcrypt
                .hash(newPassword, SALT_OR_ROUNDS)
                .catch((err) => {
                throw err;
            });
        if (picture)
            _picture = await this.imagesService.create(picture, imageFolder || '/users');
        if (oldPicture === null || oldPicture === void 0 ? void 0 : oldPicture.publicId)
            await this.imagesService.delete(oldPicture.publicId);
        const __user = await this.prisma.user.update({
            where: { id: userData.id },
            data: Object.assign(Object.assign(Object.assign(Object.assign({}, userData), (!!newHashedPassword && { password: newHashedPassword })), (role && { role: { connect: { id: role } } })), ((_picture === null || _picture === void 0 ? void 0 : _picture.id) && { picture: { connect: { id: _picture.id } } })),
            include: this.include,
        });
        const { password: _1, pictureId: _2, roleId: _3 } = __user, user = __rest(__user, ["password", "pictureId", "roleId"]);
        return user;
    }
    async delete(id) {
        return await this.prisma.user.delete({
            where: { id },
            include: this.include,
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        images_service_1.ImagesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map