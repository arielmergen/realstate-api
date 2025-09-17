import { PrismaService } from '../../db/prisma.service';
import { FeatureInput, Feature, UpdateFeatureInput } from '../../entities';
import { GridService } from '../grid/grid.service';
import { ImagesService } from '../images/images.service';
import { SliderService } from '../slider/slider.service';
export declare class FeaturesService {
    private prisma;
    private imagesService;
    private gridService;
    private sliderService;
    private IMAGES_FOLDER;
    private include;
    constructor(prisma: PrismaService, imagesService: ImagesService, gridService: GridService, sliderService: SliderService);
    create({ slider, grid, location, masterplan, attachments, highlightedImage, secondaryImage, highlightedItems, ...featureData }: FeatureInput): Promise<Feature>;
    findAll(): Promise<Feature[]>;
    findOne(id: string): Promise<Feature | null>;
    update(id: string, { slider, grid, location, masterplan, attachments, highlightedImage, secondaryImage, highlightedItems, oldHighlightedImage, oldSecondaryImage, ...featureData }: UpdateFeatureInput): Promise<Feature>;
    delete(id: string): Promise<Feature>;
}
