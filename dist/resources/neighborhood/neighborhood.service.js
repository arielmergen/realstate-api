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
exports.NeighborhoodService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma.service");
let NeighborhoodService = class NeighborhoodService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(_a) {
        var { entrepreneurship } = _a, neighborhoodData = __rest(_a, ["entrepreneurship"]);
        return await this.prisma.neighborhood.create({
            data: Object.assign(Object.assign({}, neighborhoodData), { entrepreneurship: {
                    connect: {
                        id: entrepreneurship,
                    },
                } }),
            include: {
                entrepreneurship: true,
            },
        });
    }
    async findAll(associatedEntrepreneurshipId) {
        return await this.prisma.neighborhood.findMany(Object.assign(Object.assign({}, (associatedEntrepreneurshipId && {
            where: {
                entrepreneurship: {
                    id: associatedEntrepreneurshipId,
                },
            },
        })), { include: {
                entrepreneurship: true,
            } }));
    }
    async findOne(id) {
        return this.prisma.neighborhood.findUnique({
            where: {
                id,
            },
            include: {
                entrepreneurship: true,
            },
        });
    }
    async update(id, _a) {
        var { entrepreneurship } = _a, neighborhoodData = __rest(_a, ["entrepreneurship"]);
        return this.prisma.neighborhood.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign({}, neighborhoodData), { entrepreneurship: {
                    connect: {
                        id: entrepreneurship,
                    },
                } }),
            include: {
                entrepreneurship: true,
            },
        });
    }
    async delete(id) {
        return this.prisma.neighborhood.delete({ where: { id } });
    }
};
NeighborhoodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NeighborhoodService);
exports.NeighborhoodService = NeighborhoodService;
//# sourceMappingURL=neighborhood.service.js.map