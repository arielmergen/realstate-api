import { ServicesService } from './services.service';
import { ServiceInput } from '../../entities';
import { Service } from '@prisma/client';
export declare class ServicesResolver {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceInput: ServiceInput): Promise<Service>;
    findAll(): Promise<Service[]>;
    findOne(id: string): Promise<Service | null>;
    update(id: string, updateServiceInput: ServiceInput): Promise<Service>;
    delete(id: string): Promise<Service>;
}
