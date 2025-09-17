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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../db/prisma.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ImagesService = class ImagesService {
    constructor(prisma, cloudinary) {
        this.prisma = prisma;
        this.cloudinary = cloudinary;
    }
    async create(_a, folder) {
        var { base64Image } = _a, createImageInput = __rest(_a, ["base64Image"]);
        const _image = await this.cloudinary.create(base64Image, folder);
        const _b = await this.prisma.image.create({
            data: Object.assign(Object.assign({}, createImageInput), { publicId: _image.public_id, src: _image.secure_url }),
        }), { highlightedImageId: _1, secondaryImageId: _2 } = _b, image = __rest(_b, ["highlightedImageId", "secondaryImageId"]);
        return image;
    }
    async findAll() {
        return await this.prisma.image.findMany();
    }
    async findOne(id) {
        return await this.prisma.image.findUnique({ where: { id } });
    }
    async delete(publicId) {
        await this.cloudinary.delete(publicId).catch((err) => {
            console.error(err);
        });
        return await this.prisma.image.delete({ where: { publicId } });
    }
};
ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], ImagesService);
exports.ImagesService = ImagesService;
//# sourceMappingURL=images.service.js.map