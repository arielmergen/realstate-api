import { PrismaService } from '../../db/prisma.service';
import { EntrepreneurshipInput, Entrepreneurship } from '../../entities';
export declare class EntrepreneurshipService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ zone, ...entrepreneurshipData }: EntrepreneurshipInput): Promise<Entrepreneurship>;
    findAll(associatedZoneId: string): Promise<Entrepreneurship[]>;
    findOne(id: string): Promise<Entrepreneurship | null>;
    update(id: string, { zone, ...entrepreneurshipData }: EntrepreneurshipInput): Promise<{
        zone: import("@prisma/client/runtime").GetResult<{
            id: string;
            name: string;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        zoneId: string;
        tokkoId: string | null;
    }, unknown, never> & {}>;
    delete(id: string): Promise<Entrepreneurship>;
}
