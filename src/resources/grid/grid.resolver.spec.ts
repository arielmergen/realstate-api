import { Test, TestingModule } from '@nestjs/testing';
import { GridResolver } from './grid.resolver';
import { GridService } from './grid.service';

describe('GridResolver', () => {
  let resolver: GridResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GridResolver, GridService],
    }).compile();

    resolver = module.get<GridResolver>(GridResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
