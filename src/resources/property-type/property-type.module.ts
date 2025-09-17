import { Module } from '@nestjs/common';
import { PropertyTypeService } from './property-type.service';
import { PropertyTypeResolver } from './property-type.resolver';

@Module({
  providers: [PropertyTypeResolver, PropertyTypeService],
})
export class PropertyTypeModule {}
