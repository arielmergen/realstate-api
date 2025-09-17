import { Module } from '@nestjs/common';
import { NeighborhoodService } from './neighborhood.service';
import { NeighborhoodResolver } from './neighborhood.resolver';

@Module({
  providers: [NeighborhoodResolver, NeighborhoodService],
})
export class NeighborhoodModule {}
