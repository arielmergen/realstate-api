import { PrismaService } from '../../db/prisma.service';
import { GridInput, UpdateGridInput, Grid } from '../../entities';
import { ImagesService } from '../images/images.service';
export declare class GridService {
    private prisma;
    private imagesService;
    private include;
    constructor(prisma: PrismaService, imagesService: ImagesService);
    create({ slides, imageFolder, ...grid }: GridInput & {
        imageFolder?: string;
    }): Promise<Grid>;
    findAll(): Promise<Grid[]>;
    findOne(id: string): Promise<Grid | null>;
    update(id: string, { slides, id, imageFolder, ...grid }: UpdateGridInput & {
        imageFolder?: string;
    }): Promise<Grid>;
    delete(id: string): Promise<Grid>;
}
