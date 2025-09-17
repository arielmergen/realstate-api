import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ZonesService } from './zones.service';
import { ZoneInput, Zone } from '../../entities';

@Resolver('Zone')
export class ZonesResolver {
  constructor(private readonly zoneService: ZonesService) {}

  @Mutation('createZone')
  async create(@Args('zoneInput') createZoneInput: ZoneInput): Promise<Zone> {
    return await this.zoneService.create(createZoneInput);
  }

  @Query('zones')
  async findAll(): Promise<Zone[]> {
    return await this.zoneService.findAll();
  }

  @Query('zone')
  async findOne(@Args('id') id: string): Promise<Zone | null> {
    return await this.zoneService.findOne(id);
  }

  @Mutation('updateZone')
  async update(
    @Args('id') id: string,
    @Args('zoneInput') updateZoneInput: ZoneInput,
  ): Promise<Zone> {
    return await this.zoneService.update(id, updateZoneInput);
  }

  @Mutation('deleteZone')
  async delete(@Args('id') id: string): Promise<Zone> {
    return await this.zoneService.delete(id);
  }
}
