import { Test, TestingModule } from '@nestjs/testing';
import { PropertyTypeResolver } from './property-type.resolver';
import { PropertyTypeService } from './property-type.service';

describe('PropertyTypeResolver', () => {
  let resolver: PropertyTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyTypeResolver, PropertyTypeService],
    }).compile();

    resolver = module.get<PropertyTypeResolver>(PropertyTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
