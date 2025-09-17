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
exports.FeaturesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma.service");
const grid_service_1 = require("../grid/grid.service");
const images_service_1 = require("../images/images.service");
const slider_service_1 = require("../slider/slider.service");
let FeaturesService = class FeaturesService {
    constructor(prisma, imagesService, gridService, sliderService) {
        this.prisma = prisma;
        this.imagesService = imagesService;
        this.gridService = gridService;
        this.sliderService = sliderService;
        this.IMAGES_FOLDER = '/features';
        this.include = {
            slider: {
                include: {
                    slides: {
                        include: {
                            image: true,
                        },
                    },
                },
            },
            grid: {
                include: {
                    slides: {
                        include: {
                            image: true,
                        },
                    },
                },
            },
            location: true,
            attachments: true,
            masterplan: true,
            highlightedImage: true,
            secondaryImage: true,
        };
    }
    async create(_a) {
        var { slider, grid, location, masterplan, attachments, highlightedImage, secondaryImage, highlightedItems } = _a, featureData = __rest(_a, ["slider", "grid", "location", "masterplan", "attachments", "highlightedImage", "secondaryImage", "highlightedItems"]);
        let _highlightedImage;
        let _secondaryImage;
        let _grid;
        let _slider;
        if (grid)
            _grid = await this.gridService.create(Object.assign(Object.assign({}, grid), { imageFolder: `${this.IMAGES_FOLDER}/grid` }));
        if (slider)
            _slider = await this.sliderService.create(Object.assign(Object.assign({}, slider), { imageFolder: `${this.IMAGES_FOLDER}/slider` }));
        if (highlightedImage)
            _highlightedImage = await this.imagesService.create(highlightedImage, this.IMAGES_FOLDER);
        if (secondaryImage)
            _secondaryImage = await this.imagesService.create(secondaryImage, this.IMAGES_FOLDER);
        return await this.prisma.feature.create({
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, featureData), (highlightedItems && { highlightedItems })), (_slider && {
                slider: {
                    connect: {
                        id: _slider.id,
                    },
                },
            })), (_grid && {
                grid: {
                    connect: {
                        id: _grid.id,
                    },
                },
            })), (location && {
                location: {
                    create: location,
                },
            })), (masterplan && {
                masterplan: {
                    create: masterplan,
                },
            })), (attachments && {
                attachments: {
                    create: attachments,
                },
            })), (_highlightedImage && {
                highlightedImage: {
                    connect: { id: _highlightedImage.id },
                },
            })), (_secondaryImage && {
                secondaryImage: {
                    connect: { id: _secondaryImage.id },
                },
            })), { innerState: 'Publicado', code: `BB${Date.now().toString().slice(0, 6)}` }),
            include: this.include,
        });
    }
    async findAll() {
        return await this.prisma.feature.findMany({
            include: this.include,
        });
    }
    async findOne(id) {
        return await this.prisma.feature.findUnique({
            where: { id },
            include: this.include,
        });
    }
    async update(id, _a) {
        var { slider, grid, location, masterplan, attachments, highlightedImage, secondaryImage, highlightedItems, oldHighlightedImage, oldSecondaryImage } = _a, featureData = __rest(_a, ["slider", "grid", "location", "masterplan", "attachments", "highlightedImage", "secondaryImage", "highlightedItems", "oldHighlightedImage", "oldSecondaryImage"]);
        let _highlightedImage;
        let _secondaryImage;
        let _grid;
        let _slider;
        if (grid) {
            if (grid.id)
                await this.gridService.update(grid.id, Object.assign(Object.assign({}, grid), { imageFolder: `${this.IMAGES_FOLDER}/grid` }));
            else
                _grid = await this.gridService.create(Object.assign(Object.assign({}, grid), { imageFolder: `${this.IMAGES_FOLDER}/grid` }));
        }
        if (slider) {
            if (slider.id) {
                await this.sliderService.update(slider.id, Object.assign(Object.assign({}, slider), { imageFolder: `${this.IMAGES_FOLDER}/slider` }));
            }
            else
                _slider = await this.sliderService.create(Object.assign(Object.assign({}, slider), { imageFolder: `${this.IMAGES_FOLDER}/slider` }));
        }
        if (highlightedImage)
            _highlightedImage = await this.imagesService.create(highlightedImage, this.IMAGES_FOLDER);
        if (secondaryImage)
            _secondaryImage = await this.imagesService.create(secondaryImage, this.IMAGES_FOLDER);
        if (oldSecondaryImage === null || oldSecondaryImage === void 0 ? void 0 : oldSecondaryImage.publicId)
            await this.imagesService.delete(oldSecondaryImage.publicId);
        if (oldHighlightedImage === null || oldHighlightedImage === void 0 ? void 0 : oldHighlightedImage.publicId)
            await this.imagesService.delete(oldHighlightedImage.publicId);
        return await this.prisma.feature.update({
            where: {
                id,
            },
            data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, featureData), (highlightedItems && { highlightedItems })), (_slider && {
                slider: {
                    connect: {
                        id: _slider.id,
                    },
                },
            })), (_grid && {
                grid: {
                    connect: {
                        id: _grid.id,
                    },
                },
            })), (location && {
                location: {
                    update: location,
                },
            })), (masterplan && {
                masterplan: {
                    update: masterplan,
                },
            })), (attachments && {
                attachments: {
                    updateMany: attachments.map((_a) => {
                        var { id } = _a, attachment = __rest(_a, ["id"]);
                        return ({
                            where: { id },
                            data: attachment,
                        });
                    }),
                },
            })), (_highlightedImage && {
                highlightedImage: {
                    connect: { id: _highlightedImage.id },
                },
            })), (_secondaryImage && {
                secondaryImage: {
                    connect: { id: _secondaryImage.id },
                },
            })), { innerState: 'Publicado', code: `BB${Date.now().toString().slice(0, 6)}` }),
            include: this.include,
        });
    }
    async delete(id) {
        let deletedSlider;
        let deletedGrid;
        await this.prisma.masterplan.deleteMany({
            where: { featureId: id },
        });
        const deletedFeature = await this.prisma.feature.delete({
            where: { id },
            include: this.include,
        });
        if (deletedFeature.highlightedImage)
            await this.imagesService.delete(deletedFeature.highlightedImage.publicId);
        if (deletedFeature.secondaryImage)
            await this.imagesService.delete(deletedFeature.secondaryImage.publicId);
        if (deletedFeature.slider)
            deletedSlider = await this.sliderService.delete(deletedFeature.slider.id);
        if (deletedFeature.grid)
            deletedGrid = await this.gridService.delete(deletedFeature.grid.id);
        if (deletedSlider === null || deletedSlider === void 0 ? void 0 : deletedSlider.slides)
            for (let i = 0; i < deletedSlider.slides.length; i++) {
                const image = deletedSlider.slides[i].image;
                if (image)
                    await this.imagesService.delete(image.publicId);
            }
        if (deletedGrid === null || deletedGrid === void 0 ? void 0 : deletedGrid.slides)
            for (let i = 0; i < deletedGrid.slides.length; i++) {
                const image = deletedGrid.slides[i].image;
                if (image)
                    await this.imagesService.delete(image.publicId);
            }
        return deletedFeature;
    }
};
FeaturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        images_service_1.ImagesService,
        grid_service_1.GridService,
        slider_service_1.SliderService])
], FeaturesService);
exports.FeaturesService = FeaturesService;
//# sourceMappingURL=features.service.js.map