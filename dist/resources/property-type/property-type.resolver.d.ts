import { PropertyType } from '@prisma/client';
import { PropertyTypeService } from './property-type.service';
import { PropertyTypeInput } from '../../entities';
export declare class PropertyTypeResolver {
    private readonly propertyTypeService;
    constructor(propertyTypeService: PropertyTypeService);
    create(propertyTypeInput: PropertyTypeInput): Promise<PropertyType>;
    findAll(): Promise<PropertyType[]>;
    findOne(id: string): Promise<PropertyType | null>;
    delete(id: string): Promise<PropertyType>;
}
