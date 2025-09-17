import { Module } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenitiesResolver } from './amenities.resolver';

@Module({
  providers: [AmenitiesResolver, AmenitiesService],
})
export class AmenitiesModule {}
