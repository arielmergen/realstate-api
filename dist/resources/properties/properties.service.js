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
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../db/prisma.service");
const images_service_1 = require("../images/images.service");
const owner_service_1 = require("../owner/owner.service");
let PropertiesService = class PropertiesService {
    constructor(prisma, imagesService, ownersService) {
        this.prisma = prisma;
        this.imagesService = imagesService;
        this.ownersService = ownersService;
        this.include = {
            amenities: true,
            services: true,
            images: true,
            type: true,
            geoCity: true,
            geoZone: true,
            geoLocation: true,
            owner: true,
            createdBy: {
                include: {
                    role: true,
                },
            },
        };
    }
    async create(_a) {
        var { geoZone, geoCity, geoLocation, type, amenities, services, images, attachments, owner, createdByEmail, videos } = _a, propertyData = __rest(_a, ["geoZone", "geoCity", "geoLocation", "type", "amenities", "services", "images", "attachments", "owner", "createdByEmail", "videos"]);
        let _images = [];
        if (images === null || images === void 0 ? void 0 : images.length)
            for (let i = 0; images.length > i; i++)
                _images = [
                    ..._images,
                    await this.imagesService.create(images[i], '/properties'),
                ];
        const createdProperty = await this.prisma.property.create({
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, propertyData), { videos: videos || [], createdBy: {
                    connect: {
                        email: createdByEmail,
                    },
                }, attachments: attachments || [], geoZone: {
                    connect: {
                        id: geoZone,
                    },
                } }), (owner && {
                owner: {
                    connect: {
                        id: owner,
                    },
                },
            })), (geoCity && {
                geoCity: {
                    connect: {
                        id: geoCity,
                    },
                },
            })), { geoLocation: {
                    connect: {
                        id: geoLocation,
                    },
                } }), (type && {
                type: {
                    connect: {
                        id: type,
                    },
                },
            })), ((amenities === null || amenities === void 0 ? void 0 : amenities.length) && {
                amenities: {
                    connect: amenities.map((id) => ({
                        id: id,
                    })),
                },
            })), ((services === null || services === void 0 ? void 0 : services.length) && {
                services: {
                    connect: services.map((id) => ({
                        id: id,
                    })),
                },
            })), ((_images === null || _images === void 0 ? void 0 : _images.length) && {
                images: {
                    connect: _images.map(({ id }) => ({
                        id: id,
                    })),
                },
            })), { innerState: 'Publicado', code: `AA${Date.now().toString().slice(6)}` }),
            include: this.include,
        });
        const _b = createdProperty.createdBy, { password: _, pictureId: _3, refreshToken: _4 } = _b, createdBy = __rest(_b, ["password", "pictureId", "refreshToken"]), cuttedCreatedProperty = __rest(createdProperty, ["createdBy"]);
        return Object.assign(Object.assign({}, cuttedCreatedProperty), { createdBy });
    }
    async findAll(_a = {}, first, after) {
        var _b, _c;
        var { amenities, antiquity, antiquityFrom, backyardSquareSpaceFrom, backyardSquareSpaceTo, bedroomsAmountFrom, bedroomsAmountTo, currency, disposal, features, frontSquareSpaceFrom, frontSquareSpaceTo, geoCity, geoLocation, geoZone, innerSquareSpaceFrom, innerSquareSpaceTo, operation, orientation, outterSquareSpaceFrom, outterSquareSpaceTo, priceFrom, priceTo, semiInnerSquareSpaceFrom, semiInnerSquareSpaceTo, services, spacesNumberFrom, spacesNumberTo, tipology, totalBuiltSquareSpaceFrom, totalBuiltSquareSpaceTo, totalSquareSpaceFrom, totalSquareSpaceTo, type } = _a, filters = __rest(_a, ["amenities", "antiquity", "antiquityFrom", "backyardSquareSpaceFrom", "backyardSquareSpaceTo", "bedroomsAmountFrom", "bedroomsAmountTo", "currency", "disposal", "features", "frontSquareSpaceFrom", "frontSquareSpaceTo", "geoCity", "geoLocation", "geoZone", "innerSquareSpaceFrom", "innerSquareSpaceTo", "operation", "orientation", "outterSquareSpaceFrom", "outterSquareSpaceTo", "priceFrom", "priceTo", "semiInnerSquareSpaceFrom", "semiInnerSquareSpaceTo", "services", "spacesNumberFrom", "spacesNumberTo", "tipology", "totalBuiltSquareSpaceFrom", "totalBuiltSquareSpaceTo", "totalSquareSpaceFrom", "totalSquareSpaceTo", "type"]);
        const where = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, filters), (currency && { currency })), (operation && { operation })), (disposal && { disposal: { in: disposal } })), (orientation && { orientation: { in: orientation } })), (!!(type === null || type === void 0 ? void 0 : type.length) && {
            type: { is: { id: { in: type.map((id) => id) } } },
        })), (geoZone && { geoZone: { id: geoZone } })), (geoLocation && { geoLocation: { id: geoLocation } })), (!!(geoCity === null || geoCity === void 0 ? void 0 : geoCity.length) && {
            geoCity: { is: { id: { in: geoCity.map((id) => id) } } },
        })), (!!(amenities === null || amenities === void 0 ? void 0 : amenities.length) && {
            amenities: { some: { id: { in: amenities.map((id) => id) } } },
        })), (!!(services === null || services === void 0 ? void 0 : services.length) && {
            services: { some: { id: { in: services.map((id) => id) } } },
        })), (((_b = features === null || features === void 0 ? void 0 : features.services) === null || _b === void 0 ? void 0 : _b.length) &&
            ((_c = features === null || features === void 0 ? void 0 : features.amenities) === null || _c === void 0 ? void 0 : _c.length) && {
            AND: [
                {
                    services: {
                        some: {
                            id: { in: features.services.map((id) => id) },
                        },
                    },
                },
                {
                    amenities: {
                        some: {
                            id: { in: features.amenities.map((id) => id) },
                        },
                    },
                },
            ],
        })), (antiquity &&
            antiquityFrom && {
            antiquity: { in: antiquity },
        })), (antiquityFrom &&
            !antiquity && {
            antiquity: {
                gte: antiquityFrom,
            },
        })), (antiquityFrom &&
            antiquity && {
            AND: [
                {
                    antiquity: {
                        gte: antiquityFrom,
                    },
                },
                {
                    antiquity: { in: antiquity },
                },
            ],
        })), (priceFrom &&
            !priceTo && {
            price: {
                gte: priceFrom,
            },
        })), (priceTo &&
            !priceFrom && {
            price: {
                lte: priceTo,
            },
        })), (priceTo &&
            priceFrom && {
            AND: [
                {
                    price: { lte: priceTo },
                },
                {
                    price: {
                        gte: priceFrom,
                    },
                },
            ],
        })), (spacesNumberFrom &&
            !spacesNumberTo && {
            spacesNumber: {
                gte: spacesNumberFrom,
            },
        })), (spacesNumberTo &&
            !spacesNumberFrom && {
            spacesNumber: {
                lte: spacesNumberTo,
            },
        })), (spacesNumberFrom &&
            spacesNumberTo && {
            AND: [
                {
                    spacesNumber: {
                        lte: spacesNumberTo,
                    },
                },
                {
                    spacesNumber: {
                        gte: spacesNumberFrom,
                    },
                },
            ],
        })), (bedroomsAmountFrom &&
            !bedroomsAmountTo && {
            bedroomsAmount: {
                gte: bedroomsAmountFrom,
            },
        })), (bedroomsAmountTo &&
            !bedroomsAmountFrom && {
            bedroomsAmount: {
                lte: bedroomsAmountTo,
            },
        })), (bedroomsAmountFrom &&
            bedroomsAmountTo && {
            AND: [
                {
                    bedroomsAmount: {
                        lte: bedroomsAmountTo,
                    },
                },
                {
                    bedroomsAmount: {
                        gte: bedroomsAmountFrom,
                    },
                },
            ],
        })), (frontSquareSpaceFrom &&
            !frontSquareSpaceTo && {
            frontSquareSpace: {
                gte: frontSquareSpaceFrom,
            },
        })), (frontSquareSpaceTo &&
            !frontSquareSpaceFrom && {
            frontSquareSpace: {
                lte: frontSquareSpaceTo,
            },
        })), (frontSquareSpaceFrom &&
            frontSquareSpaceTo && {
            AND: [
                {
                    frontSquareSpace: {
                        lte: frontSquareSpaceTo,
                    },
                },
                {
                    frontSquareSpace: {
                        gte: frontSquareSpaceFrom,
                    },
                },
            ],
        })), (backyardSquareSpaceFrom &&
            !backyardSquareSpaceTo && {
            backyardSquareSpace: {
                gte: backyardSquareSpaceFrom,
            },
        })), (backyardSquareSpaceTo &&
            !backyardSquareSpaceFrom && {
            backyardSquareSpace: {
                lte: backyardSquareSpaceTo,
            },
        })), (backyardSquareSpaceFrom &&
            backyardSquareSpaceTo && {
            AND: [
                {
                    backyardSquareSpace: {
                        lte: backyardSquareSpaceTo,
                    },
                },
                {
                    backyardSquareSpace: {
                        gte: backyardSquareSpaceFrom,
                    },
                },
            ],
        })), (outterSquareSpaceFrom &&
            !outterSquareSpaceTo && {
            outterSquareSpace: {
                gte: outterSquareSpaceFrom,
            },
        })), (outterSquareSpaceTo &&
            !outterSquareSpaceFrom && {
            outterSquareSpace: {
                lte: outterSquareSpaceTo,
            },
        })), (outterSquareSpaceFrom &&
            outterSquareSpaceTo && {
            AND: [
                {
                    outterSquareSpace: {
                        lte: outterSquareSpaceTo,
                    },
                },
                {
                    outterSquareSpace: {
                        gte: outterSquareSpaceFrom,
                    },
                },
            ],
        })), (innerSquareSpaceFrom &&
            !innerSquareSpaceTo && {
            innerSquareSpace: {
                gte: innerSquareSpaceFrom,
            },
        })), (innerSquareSpaceTo &&
            !innerSquareSpaceFrom && {
            innerSquareSpace: {
                lte: innerSquareSpaceTo,
            },
        })), (innerSquareSpaceFrom &&
            innerSquareSpaceTo && {
            AND: [
                {
                    innerSquareSpace: {
                        lte: innerSquareSpaceTo,
                    },
                },
                {
                    innerSquareSpace: {
                        gte: innerSquareSpaceFrom,
                    },
                },
            ],
        })), (semiInnerSquareSpaceFrom &&
            !semiInnerSquareSpaceTo && {
            semiInnerSquareSpace: {
                gte: semiInnerSquareSpaceFrom,
            },
        })), (semiInnerSquareSpaceTo &&
            !semiInnerSquareSpaceFrom && {
            semiInnerSquareSpace: {
                lte: semiInnerSquareSpaceTo,
            },
        })), (semiInnerSquareSpaceTo &&
            semiInnerSquareSpaceFrom && {
            AND: [
                {
                    semiInnerSquareSpace: {
                        lte: semiInnerSquareSpaceTo,
                    },
                },
                {
                    semiInnerSquareSpace: {
                        gte: semiInnerSquareSpaceFrom,
                    },
                },
            ],
        })), (totalBuiltSquareSpaceFrom &&
            !totalBuiltSquareSpaceTo && {
            totalBuiltSquareSpace: {
                gte: totalBuiltSquareSpaceFrom,
            },
        })), (totalBuiltSquareSpaceTo &&
            !totalBuiltSquareSpaceFrom && {
            totalBuiltSquareSpace: {
                lte: totalBuiltSquareSpaceTo,
            },
        })), (totalBuiltSquareSpaceTo &&
            totalBuiltSquareSpaceFrom && {
            AND: [
                {
                    totalBuiltSquareSpace: {
                        lte: totalBuiltSquareSpaceTo,
                    },
                },
                {
                    totalBuiltSquareSpace: {
                        gte: totalBuiltSquareSpaceFrom,
                    },
                },
            ],
        })), (totalSquareSpaceFrom &&
            !totalSquareSpaceTo && {
            totalSquareSpace: {
                gte: totalSquareSpaceFrom,
            },
        })), (totalSquareSpaceTo &&
            !totalSquareSpaceFrom && {
            totalSquareSpace: {
                lte: totalSquareSpaceTo,
            },
        })), (totalSquareSpaceTo &&
            totalSquareSpaceFrom && {
            AND: [
                {
                    totalSquareSpace: {
                        lte: totalSquareSpaceTo,
                    },
                },
                {
                    totalSquareSpace: {
                        gte: totalSquareSpaceFrom,
                    },
                },
            ],
        }));
        const config = Object.assign(Object.assign({}, (!!Object.keys(where).length && { where })), { orderBy: {
                createdAt: client_1.Prisma.SortOrder.desc,
            }, include: this.include });
        const allProperties = await this.prisma.property.findMany(Object.assign(Object.assign(Object.assign({}, (first && { take: first })), (after && { skip: 1, cursor: { id: after } })), config));
        if (!!(allProperties === null || allProperties === void 0 ? void 0 : allProperties.length)) {
            const propertiesLength = await this.prisma.property.count({
                where,
            });
            const lastProperty = allProperties[allProperties.length - 1];
            const myCursor = lastProperty === null || lastProperty === void 0 ? void 0 : lastProperty.id;
            const nextProperties = await this.prisma.property.findMany(Object.assign({ take: first, cursor: {
                    id: myCursor,
                } }, config));
            const hasNextPage = (nextProperties === null || nextProperties === void 0 ? void 0 : nextProperties.length) >= first;
            const result = {
                totalCount: propertiesLength,
                pageInfo: {
                    endCursor: `${myCursor}`,
                    hasNextPage,
                },
                edges: allProperties.map((_a) => {
                    var { createdAt, id, amenities, services, geoCity, geoLocation, geoZone, images, type, createdBy } = _a, propertyData = __rest(_a, ["createdAt", "id", "amenities", "services", "geoCity", "geoLocation", "geoZone", "images", "type", "createdBy"]);
                    const { pictureId: _, password: _3, refreshToken: _4 } = createdBy, cuttedCreatedBy = __rest(createdBy, ["pictureId", "password", "refreshToken"]);
                    return {
                        cursor: `${id}`,
                        node: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ id: `${id}`, createdAt: `${createdAt}` }, (amenities && {
                            amenities,
                        })), (services && {
                            services,
                        })), (images && {
                            images,
                        })), (type && {
                            type: Object.assign(Object.assign({}, type), { states: type.states, id: type.id }),
                        })), (geoCity && {
                            geoCity,
                        })), (geoLocation && {
                            geoLocation,
                        })), (geoZone && {
                            geoZone,
                        })), (createdBy && {
                            createdBy: cuttedCreatedBy,
                        })), propertyData),
                    };
                }),
            };
            return result;
        }
        return {
            totalCount: 0,
            pageInfo: {
                endCursor: null,
                hasNextPage: false,
            },
            edges: [],
        };
    }
    async findOne(id) {
        const foundProperty = await this.prisma.property.findUnique({
            where: { id },
            include: this.include,
        });
        if (!foundProperty)
            return foundProperty;
        const _a = foundProperty.createdBy, { password: _, pictureId: _3, refreshToken: _4 } = _a, createdBy = __rest(_a, ["password", "pictureId", "refreshToken"]), cuttedFoundProperty = __rest(foundProperty, ["createdBy"]);
        return Object.assign(Object.assign({}, cuttedFoundProperty), { createdBy });
    }
    async update(id, _a) {
        var { type, geoCity, geoLocation, geoZone, amenities, services, images, oldImages, attachments, owner, createdByEmail, videos } = _a, propertyData = __rest(_a, ["type", "geoCity", "geoLocation", "geoZone", "amenities", "services", "images", "oldImages", "attachments", "owner", "createdByEmail", "videos"]);
        let _images = [];
        if (images === null || images === void 0 ? void 0 : images.length)
            for (let i = 0; images.length > i; i++)
                _images = [
                    ..._images,
                    await this.imagesService.create(images[i], '/properties'),
                ];
        if (oldImages === null || oldImages === void 0 ? void 0 : oldImages.length)
            for (let i = 0; oldImages.length > i; i++)
                await this.imagesService.delete(oldImages[i].publicId);
        console.info(owner);
        const updatedProperty = await this.prisma.property.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, propertyData), { updatedAt: new Date(), videos: videos || [], attachments: attachments || [], createdBy: {
                    connect: {
                        email: createdByEmail,
                    },
                } }), (owner && {
                owner: {
                    connect: {
                        id: owner,
                    },
                },
            })), (type && {
                type: {
                    connect: {
                        id: type,
                    },
                },
            })), (geoCity && {
                geoCity: {
                    connect: {
                        id: geoCity,
                    },
                },
            })), (geoLocation && {
                geoLocation: {
                    connect: {
                        id: geoLocation,
                    },
                },
            })), (geoZone && {
                geoZone: {
                    connect: {
                        id: geoZone,
                    },
                },
            })), ((amenities === null || amenities === void 0 ? void 0 : amenities.length) && {
                amenities: {
                    connect: amenities.map((id) => ({
                        id: id,
                    })),
                },
            })), ((services === null || services === void 0 ? void 0 : services.length) && {
                services: {
                    connect: services === null || services === void 0 ? void 0 : services.map((id) => ({
                        id: id,
                    })),
                },
            })), (_images.length && {
                images: Object.assign({}, ((_images === null || _images === void 0 ? void 0 : _images.length) && {
                    connect: _images.map(({ id }) => ({
                        id: id,
                    })),
                })),
            })),
            include: this.include,
        });
        const _b = updatedProperty.createdBy, { password: _, pictureId: _3, refreshToken: _4 } = _b, createdBy = __rest(_b, ["password", "pictureId", "refreshToken"]), cuttedUpdatedProperty = __rest(updatedProperty, ["createdBy"]);
        return Object.assign(Object.assign({}, cuttedUpdatedProperty), { createdBy });
    }
    async delete(id) {
        const deletedProperty = await this.prisma.property.delete({
            where: { id },
            include: this.include,
        });
        const images = deletedProperty.images;
        for (let i = 0; i < images.length; i++)
            await this.imagesService.delete(images[i].publicId);
        const _a = deletedProperty.createdBy, { password: _, pictureId: _3, refreshToken: _4 } = _a, createdBy = __rest(_a, ["password", "pictureId", "refreshToken"]), cuttedDeletedProperty = __rest(deletedProperty, ["createdBy"]);
        return Object.assign(Object.assign({}, cuttedDeletedProperty), { createdBy });
    }
};
PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        images_service_1.ImagesService,
        owner_service_1.OwnerService])
], PropertiesService);
exports.PropertiesService = PropertiesService;
//# sourceMappingURL=properties.service.js.map