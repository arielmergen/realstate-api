import { Test, TestingModule } from '@nestjs/testing';
import { HomeConfigurationService } from './home-configuration.service';

describe('HomeConfigurationService', () => {
  let service: HomeConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeConfigurationService],
    }).compile();

    service = module.get<HomeConfigurationService>(HomeConfigurationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
