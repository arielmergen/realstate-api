import { PrismaService } from '../../db/prisma.service';
import { NeighborhoodInput, Neighborhood } from '../../entities';
export declare class NeighborhoodService {
    private prisma;
    constructor(prisma: PrismaService);
    create({ entrepreneurship, ...neighborhoodData }: NeighborhoodInput): Promise<Neighborhood>;
    findAll(associatedEntrepreneurshipId: string): Promise<Neighborhood[]>;
    findOne(id: string): Promise<Neighborhood | null>;
    update(id: string, { entrepreneurship, ...neighborhoodData }: NeighborhoodInput): Promise<Neighborhood>;
    delete(id: string): Promise<Neighborhood>;
}
