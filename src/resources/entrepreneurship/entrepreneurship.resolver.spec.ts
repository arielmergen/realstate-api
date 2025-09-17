import { Test, TestingModule } from '@nestjs/testing';
import { EntrepreneurshipResolver } from './entrepreneurship.resolver';
import { EntrepreneurshipService } from './entrepreneurship.service';

describe('EntrepreneurshipResolver', () => {
  let resolver: EntrepreneurshipResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntrepreneurshipResolver, EntrepreneurshipService],
    }).compile();

    resolver = module.get<EntrepreneurshipResolver>(EntrepreneurshipResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
