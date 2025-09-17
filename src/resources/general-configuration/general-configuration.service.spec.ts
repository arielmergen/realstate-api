import { Test, TestingModule } from '@nestjs/testing';
import { GeneralConfigurationService } from './general-configuration.service';

describe('GeneralConfigurationService', () => {
  let service: GeneralConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralConfigurationService],
    }).compile();

    service = module.get<GeneralConfigurationService>(
      GeneralConfigurationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
