import { GeneralConfigurationInput, GeneralConfiguration } from 'src/entities';
import { GeneralConfigurationService } from './general-configuration.service';
export declare class GeneralConfigurationResolver {
    private readonly generalConfigurationService;
    constructor(generalConfigurationService: GeneralConfigurationService);
    create(createGeneralConfigurationInput: GeneralConfigurationInput): Promise<GeneralConfiguration>;
    findAll(): Promise<GeneralConfiguration[]>;
    findOne(id: string): Promise<GeneralConfiguration | null>;
    update(updateGeneralConfigurationInput: GeneralConfigurationInput): Promise<GeneralConfiguration>;
    delete(id: string): Promise<GeneralConfiguration>;
}
