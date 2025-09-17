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
exports.SliderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma.service");
const images_service_1 = require("../images/images.service");
let SliderService = class SliderService {
    constructor(prisma, imagesService) {
        this.prisma = prisma;
        this.imagesService = imagesService;
        this.include = {
            slides: {
                include: {
                    image: true,
                },
            },
        };
    }
    async create({ slides, imageFolder, }) {
        const formattedSlides = slides === null || slides === void 0 ? void 0 : slides.map(async (_a) => {
            var { image } = _a, slide = __rest(_a, ["image"]);
            return (Object.assign(Object.assign({}, slide), (image && {
                image: {
                    connect: {
                        id: (await this.imagesService.create(image, imageFolder)).id,
                    },
                },
            })));
        });
        const resolvedFormattedSlides = formattedSlides
            ? await Promise.all(formattedSlides)
            : [];
        return await this.prisma.sliderConfiguration.create({
            data: {
                slides: {
                    create: resolvedFormattedSlides,
                },
            },
            include: this.include,
        });
    }
    async findAll() {
        return await this.prisma.sliderConfiguration.findMany({
            include: this.include,
        });
    }
    async findOne(id) {
        return await this.prisma.sliderConfiguration.findUnique({
            where: { id },
            include: this.include,
        });
    }
    async update(id, { slides, imageFolder }) {
        const slidesToDelete = await this.prisma.slide.findMany({
            where: { sliderConfigurationId: id },
            include: { image: true },
        });
        if (slidesToDelete.length)
            for (let i = 0; i < slidesToDelete.length; i++) {
                const imageToDelete = slidesToDelete[i].image;
                if (imageToDelete === null || imageToDelete === void 0 ? void 0 : imageToDelete.publicId)
                    await this.imagesService.delete(imageToDelete.publicId);
            }
        const formattedSlides = slides === null || slides === void 0 ? void 0 : slides.map(async (_a) => {
            var { image } = _a, slide = __rest(_a, ["image"]);
            return (Object.assign(Object.assign({}, slide), (image && {
                image: {
                    connect: {
                        id: (await this.imagesService.create(image, imageFolder)).id,
                    },
                },
            })));
        });
        const resolvedFormattedSlides = formattedSlides
            ? await Promise.all(formattedSlides)
            : [];
        return await this.prisma.sliderConfiguration.update({
            where: {
                id,
            },
            data: {
                slides: {
                    create: resolvedFormattedSlides,
                },
            },
            include: this.include,
        });
    }
    async delete(id) {
        const slides = await this.prisma.slide.findMany({
            where: { sliderConfigurationId: id },
        });
        for (let i = 0; slides.length < i; i++) {
            const slide = slides[i];
            if (slide.imageId)
                await this.imagesService.delete(slide.imageId);
        }
        return await this.prisma.sliderConfiguration.delete({
            where: { id },
            include: this.include,
        });
    }
};
SliderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        images_service_1.ImagesService])
], SliderService);
exports.SliderService = SliderService;
//# sourceMappingURL=slider.service.js.map