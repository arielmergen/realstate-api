import { Test, TestingModule } from '@nestjs/testing';
import { GeneralConfigurationResolver } from './general-configuration.resolver';
import { GeneralConfigurationService } from './general-configuration.service';

describe('GeneralConfigurationResolver', () => {
  let resolver: GeneralConfigurationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralConfigurationResolver, GeneralConfigurationService],
    }).compile();

    resolver = module.get<GeneralConfigurationResolver>(
      GeneralConfigurationResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
