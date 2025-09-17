import { Test, TestingModule } from '@nestjs/testing';
import { EntrepreneurshipService } from './entrepreneurship.service';

describe('EntrepreneurshipService', () => {
  let service: EntrepreneurshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntrepreneurshipService],
    }).compile();

    service = module.get<EntrepreneurshipService>(EntrepreneurshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
