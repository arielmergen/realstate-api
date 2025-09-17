import { Service } from '@prisma/client';
import { PrismaService } from '../../db/prisma.service';
import { ServiceInput } from '../../entities';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ types, ...serviceData }: ServiceInput): Promise<Service>;
    findAll(): Promise<Service[]>;
    findOne(id: string): Promise<Service | null>;
    update(id: string, { types, ...serviceData }: ServiceInput): Promise<import("@prisma/client/runtime").GetResult<{
        icon: string | null;
        id: string;
        name: string;
    }, unknown, never> & {}>;
    delete(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        icon: string | null;
        id: string;
        name: string;
    }, unknown, never> & {}>;
}
