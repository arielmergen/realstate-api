import { PrismaService } from '../../db/prisma.service';
import { HomeConfigurationInput, HomeConfiguration, UpdateHomeConfigurationInput } from '../../entities';
import { GridService } from '../grid/grid.service';
import { SliderService } from '../slider/slider.service';
export declare class HomeConfigurationService {
    private prisma;
    private gridService;
    private sliderService;
    private IMAGES_FOLDER;
    private include;
    constructor(prisma: PrismaService, gridService: GridService, sliderService: SliderService);
    create({ grid, slider, }: HomeConfigurationInput): Promise<HomeConfiguration>;
    findAll(): Promise<HomeConfiguration[]>;
    findOne(id: string): Promise<HomeConfiguration | null>;
    update(id: string, { slider, grid }?: UpdateHomeConfigurationInput): Promise<HomeConfiguration | null>;
    delete(id: string): Promise<{
        slider: ({
            slides: ({
                image: (import("@prisma/client/runtime").GetResult<{
                    alt: string | null;
                    id: string;
                    publicId: string;
                    isHighlighted: boolean | null;
                    highlightedImageId: string | null;
                    secondaryImageId: string | null;
                    src: string;
                    order: number | null;
                }, unknown, never> & {}) | null;
            } & import("@prisma/client/runtime").GetResult<{
                description: string | null;
                id: string;
                imageId: string | null;
                link: string | null;
                name: string | null;
                title: string | null;
                sliderConfigurationId: string | null;
                gridConfigurationId: string | null;
            }, unknown, never> & {})[];
        } & import("@prisma/client/runtime").GetResult<{
            id: string;
            featureId: string | null;
            homeConfigurationId: string | null;
        }, unknown, never> & {}) | null;
        grid: ({
            slides: ({
                image: (import("@prisma/client/runtime").GetResult<{
                    alt: string | null;
                    id: string;
                    publicId: string;
                    isHighlighted: boolean | null;
                    highlightedImageId: string | null;
                    secondaryImageId: string | null;
                    src: string;
                    order: number | null;
                }, unknown, never> & {}) | null;
            } & import("@prisma/client/runtime").GetResult<{
                description: string | null;
                id: string;
                imageId: string | null;
                link: string | null;
                name: string | null;
                title: string | null;
                sliderConfigurationId: string | null;
                gridConfigurationId: string | null;
            }, unknown, never> & {})[];
        } & import("@prisma/client/runtime").GetResult<{
            id: string;
            title: string | null;
            description: string | null;
            featureId: string | null;
            homeConfigurationId: string | null;
        }, unknown, never> & {}) | null;
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
    }, unknown, never> & {}>;
}
