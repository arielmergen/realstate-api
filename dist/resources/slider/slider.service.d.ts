import { PrismaService } from '../../db/prisma.service';
import { SliderInput, Slider, UpdateSliderInput } from '../../entities';
import { ImagesService } from '../images/images.service';
export declare class SliderService {
    private prisma;
    private imagesService;
    private include;
    constructor(prisma: PrismaService, imagesService: ImagesService);
    create({ slides, imageFolder, }: SliderInput & {
        imageFolder?: string;
    }): Promise<Slider>;
    findAll(): Promise<Slider[]>;
    findOne(id: string): Promise<Slider | null>;
    update(id: string, { slides, imageFolder }: UpdateSliderInput & {
        imageFolder?: string;
    }): Promise<Slider>;
    delete(id: string): Promise<Slider>;
}
