import { ImagesService } from './images.service';
import { CreateImageInput, Image } from '../../entities';
export declare class ImagesResolver {
    private readonly imageService;
    constructor(imageService: ImagesService);
    create(createImageInput: CreateImageInput): Promise<Image>;
    findAll(): Promise<Image[]>;
    findOne(id: string): Promise<Image | null>;
    delete(publicId: string): Promise<Image>;
}
