import { PropertiesService } from './properties.service';
import { PropertyFiltersInput, PropertyInput, Property, PropertyResponse } from '../../entities';
export declare class PropertiesResolver {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    create(createPropertyInput: PropertyInput): Promise<Property>;
    findAll(filters: PropertyFiltersInput, first: number, after: string): Promise<PropertyResponse>;
    findOne(id: string): Promise<Property | null>;
    update(id: string, updatePropertyInput: PropertyInput): Promise<Property>;
    delete(id: string): Promise<Property>;
}
