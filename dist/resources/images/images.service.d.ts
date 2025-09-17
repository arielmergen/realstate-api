import { PrismaService } from '../../db/prisma.service';
import { CreateImageInput, Image } from '../../entities';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class ImagesService {
    private prisma;
    private cloudinary;
    constructor(prisma: PrismaService, cloudinary: CloudinaryService);
    create({ base64Image, ...createImageInput }: CreateImageInput, folder?: string): Promise<Image>;
    findAll(): Promise<Image[]>;
    findOne(id: string): Promise<Image | null>;
    delete(publicId: string): Promise<Image>;
}
