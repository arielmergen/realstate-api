import { PrismaService } from '../../db/prisma.service';
import { PropertyFiltersInput, PropertyInput, PropertyResponse, Property } from '../../entities';
import { ImagesService } from '../images/images.service';
import { OwnerService } from '../owner/owner.service';
export declare class PropertiesService {
    private prisma;
    private imagesService;
    private ownersService;
    private include;
    constructor(prisma: PrismaService, imagesService: ImagesService, ownersService: OwnerService);
    create({ geoZone, geoCity, geoLocation, type, amenities, services, images, attachments, owner, createdByEmail, videos, ...propertyData }: PropertyInput): Promise<Property>;
    findAll({ amenities, antiquity, antiquityFrom, backyardSquareSpaceFrom, backyardSquareSpaceTo, bedroomsAmountFrom, bedroomsAmountTo, currency, disposal, features, frontSquareSpaceFrom, frontSquareSpaceTo, geoCity, geoLocation, geoZone, innerSquareSpaceFrom, innerSquareSpaceTo, operation, orientation, outterSquareSpaceFrom, outterSquareSpaceTo, priceFrom, priceTo, semiInnerSquareSpaceFrom, semiInnerSquareSpaceTo, services, spacesNumberFrom, spacesNumberTo, tipology, totalBuiltSquareSpaceFrom, totalBuiltSquareSpaceTo, totalSquareSpaceFrom, totalSquareSpaceTo, type, ...filters }: PropertyFiltersInput | undefined, first: number, after: string): Promise<PropertyResponse>;
    findOne(id: string): Promise<Property | null>;
    update(id: string, { type, geoCity, geoLocation, geoZone, amenities, services, images, oldImages, attachments, owner, createdByEmail, videos, ...propertyData }: PropertyInput): Promise<Property>;
    delete(id: string): Promise<Property>;
}
