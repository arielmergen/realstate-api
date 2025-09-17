import { NeighborhoodService } from './neighborhood.service';
import { NeighborhoodInput, Neighborhood } from '../../entities';
export declare class NeighborhoodResolver {
    private readonly neighborhoodService;
    constructor(neighborhoodService: NeighborhoodService);
    create(createNeighborhoodInput: NeighborhoodInput): Promise<Neighborhood>;
    findAll(associatedEntrepreneurshipId: string): Promise<Neighborhood[]>;
    findOne(id: string): Promise<Neighborhood | null>;
    update(id: string, updateNeighborhoodInput: NeighborhoodInput): Promise<Neighborhood>;
    delete(id: string): Promise<Neighborhood>;
}
