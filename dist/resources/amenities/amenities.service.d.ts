import { PrismaService } from '../../db/prisma.service';
import { AmenityInput } from '../../entities';
import { Amenity } from '@prisma/client';
export declare class AmenitiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ types, ...amenityData }?: AmenityInput): Promise<Amenity>;
    findAll(): Promise<Amenity[]>;
    findOne(id: string): Promise<Amenity | null>;
    update(id: string, { types, ...amenityData }?: AmenityInput): Promise<Amenity>;
    delete(id: string): Promise<Amenity>;
}
