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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma.service");
let ServicesService = class ServicesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(_a) {
        var { types } = _a, serviceData = __rest(_a, ["types"]);
        return await this.prisma.service.create({
            data: Object.assign(Object.assign({}, serviceData), ((types === null || types === void 0 ? void 0 : types.length) && {
                types: {
                    connect: types.map((id) => ({
                        id: id,
                    })),
                },
            })),
            include: {
                types: true,
            },
        });
    }
    async findAll() {
        return await this.prisma.service.findMany({
            include: {
                types: true,
            },
        });
    }
    async findOne(id) {
        return await this.prisma.service.findUnique({
            where: { id },
            include: {
                types: true,
            },
        });
    }
    async update(id, _a) {
        var { types } = _a, serviceData = __rest(_a, ["types"]);
        return this.prisma.service.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign({}, serviceData), ((types === null || types === void 0 ? void 0 : types.length) && {
                types: {
                    connect: types.map((id) => ({
                        id: id,
                    })),
                },
            })),
        });
    }
    async delete(id) {
        return this.prisma.service.delete({ where: { id } });
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map