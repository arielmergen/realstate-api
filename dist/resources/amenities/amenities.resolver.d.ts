import { Amenity } from '@prisma/client';
import { AmenitiesService } from './amenities.service';
import { AmenityInput } from '../../entities';
export declare class AmenitiesResolver {
    private readonly amenitiesService;
    constructor(amenitiesService: AmenitiesService);
    create(createAmenityInput: AmenityInput): Promise<Amenity>;
    findAll(): Promise<Amenity[]>;
    findOne(id: string): Promise<Amenity | null>;
    update(id: string, amenityInput: AmenityInput): Promise<Amenity>;
    remove(id: string): Promise<Amenity>;
}
