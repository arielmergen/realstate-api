import { PrismaService } from '../../db/prisma.service';
import { GeneralConfigurationInput, GeneralConfiguration } from '../../entities';
export declare class GeneralConfigurationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGeneralConfigurationInput: GeneralConfigurationInput): Promise<GeneralConfiguration>;
    findAll(): Promise<GeneralConfiguration[]>;
    findOne(id: string): Promise<GeneralConfiguration | null>;
    update(updateGeneralConfigurationInput: GeneralConfigurationInput): Promise<GeneralConfiguration>;
    delete(id: string): Promise<GeneralConfiguration>;
}
