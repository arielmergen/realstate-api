import { Test, TestingModule } from '@nestjs/testing';
import { NeighborhoodResolver } from './neighborhood.resolver';
import { NeighborhoodService } from './neighborhood.service';

describe('NeighborhoodResolver', () => {
  let resolver: NeighborhoodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeighborhoodResolver, NeighborhoodService],
    }).compile();

    resolver = module.get<NeighborhoodResolver>(NeighborhoodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
