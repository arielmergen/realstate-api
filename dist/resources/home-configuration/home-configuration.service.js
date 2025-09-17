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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma.service");
const grid_service_1 = require("../grid/grid.service");
const slider_service_1 = require("../slider/slider.service");
let HomeConfigurationService = class HomeConfigurationService {
    constructor(prisma, gridService, sliderService) {
        this.prisma = prisma;
        this.gridService = gridService;
        this.sliderService = sliderService;
        this.IMAGES_FOLDER = '/home-configuration';
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
        };
    }
    async create({ grid, slider, }) {
        let _grid;
        let _slider;
        if (grid)
            _grid = await this.gridService.create(Object.assign(Object.assign({}, grid), { imageFolder: `${this.IMAGES_FOLDER}/grid` }));
        if (slider)
            _slider = await this.sliderService.create(Object.assign(Object.assign({}, slider), { imageFolder: `${this.IMAGES_FOLDER}/slider` }));
        return await this.prisma.homeConfiguration.create({
            data: Object.assign(Object.assign({}, (_slider && {
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
            })),
            include: this.include,
        });
    }
    async findAll() {
        return await this.prisma.homeConfiguration.findMany({
            include: this.include,
        });
    }
    async findOne(id) {
        return await this.prisma.homeConfiguration.findUnique({
            where: { id },
            include: this.include,
        });
    }
    async update(id, { slider, grid } = {}) {
        let _slider;
        let _grid;
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
        if (_slider || _grid)
            return await this.prisma.homeConfiguration.update({
                where: { id },
                data: Object.assign(Object.assign({}, (_slider && {
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
                })),
            });
        return await this.findOne(id);
    }
    async delete(id) {
        return await this.prisma.homeConfiguration.delete({
            where: { id },
            include: this.include,
        });
    }
};
HomeConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        grid_service_1.GridService,
        slider_service_1.SliderService])
], HomeConfigurationService);
exports.HomeConfigurationService = HomeConfigurationService;
//# sourceMappingURL=home-configuration.service.js.map