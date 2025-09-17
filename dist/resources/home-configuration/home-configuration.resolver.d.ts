import { HomeConfigurationService } from './home-configuration.service';
import { HomeConfigurationInput, HomeConfiguration, UpdateHomeConfigurationInput } from '../../entities';
export declare class HomeConfigurationResolver {
    private readonly homeConfigurationService;
    constructor(homeConfigurationService: HomeConfigurationService);
    create(createHomeConfigurationInput: HomeConfigurationInput): Promise<HomeConfiguration>;
    findAll(): Promise<HomeConfiguration[]>;
    findOne(id: string): Promise<HomeConfiguration | null>;
    update(id: string, updateHomeConfigurationInput: UpdateHomeConfigurationInput): Promise<HomeConfiguration | null>;
    delete(id: string): Promise<HomeConfiguration>;
}
