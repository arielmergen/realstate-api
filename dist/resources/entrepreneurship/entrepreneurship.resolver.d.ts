import { EntrepreneurshipService } from './entrepreneurship.service';
import { EntrepreneurshipInput, Entrepreneurship } from '../../entities';
export declare class EntrepreneurshipResolver {
    private readonly entrepreneurshipService;
    constructor(entrepreneurshipService: EntrepreneurshipService);
    create(createEntrepreneurshipInput: EntrepreneurshipInput): Promise<Entrepreneurship>;
    findAll(associatedZoneId: string): Promise<Entrepreneurship[]>;
    findOne(id: string): Promise<Entrepreneurship | null>;
    update(id: string, updateEntrepreneurshipInput: EntrepreneurshipInput): Promise<Entrepreneurship>;
    delete(id: string): Promise<Entrepreneurship>;
}
