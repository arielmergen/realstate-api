import { FeatureInput, Feature, UpdateFeatureInput } from '../../entities';
import { FeaturesService } from './features.service';
export declare class FeaturesResolver {
    private readonly featuresService;
    constructor(featuresService: FeaturesService);
    create(createFeatureInput: FeatureInput): Promise<Feature>;
    findAll(): Promise<Feature[]>;
    findOne(id: string): Promise<Feature | null>;
    update(id: string, updateFeatureInput: UpdateFeatureInput): Promise<Feature>;
    delete(id: string): Promise<Feature>;
}
