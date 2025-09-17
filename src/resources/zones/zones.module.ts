import { Module } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { ZonesResolver } from './zones.resolver';

@Module({
  providers: [ZonesResolver, ZonesService],
})
export class ZonesModule {}
