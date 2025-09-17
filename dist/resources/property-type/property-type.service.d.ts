import { PropertyType } from '@prisma/client';
import { PrismaService } from '../../db/prisma.service';
import { PropertyTypeInput } from '../../entities';
export declare class PropertyTypeService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ states, ...propertyTypeData }: PropertyTypeInput): Promise<PropertyType>;
    findAll(): Promise<PropertyType[]>;
    findOne(id: string): Promise<PropertyType | null>;
    delete(id: string): Promise<PropertyType>;
}
