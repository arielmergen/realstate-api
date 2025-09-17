import { Test, TestingModule } from '@nestjs/testing';
import { HomeConfigurationResolver } from './home-configuration.resolver';
import { HomeConfigurationService } from './home-configuration.service';

describe('HomeConfigurationResolver', () => {
  let resolver: HomeConfigurationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeConfigurationResolver, HomeConfigurationService],
    }).compile();

    resolver = module.get<HomeConfigurationResolver>(HomeConfigurationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
