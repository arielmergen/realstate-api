import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { NeighborhoodService } from './neighborhood.service';
import { NeighborhoodInput, RolesName, Neighborhood } from '../../entities';

@Resolver('Neighborhood')
export class NeighborhoodResolver {
  constructor(private readonly neighborhoodService: NeighborhoodService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createNeighborhood')
  async create(
    @Args('neighborhoodInput') createNeighborhoodInput: NeighborhoodInput,
  ): Promise<Neighborhood> {
    return await this.neighborhoodService.create(createNeighborhoodInput);
  }

  @Query('neighborhoods')
  async findAll(
    @Args('associatedEntrepreneurship') associatedEntrepreneurshipId: string,
  ): Promise<Neighborhood[]> {
    return await this.neighborhoodService.findAll(associatedEntrepreneurshipId);
  }

  @Query('neighborhood')
  async findOne(@Args('id') id: string): Promise<Neighborhood | null> {
    return await this.neighborhoodService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateNeighborhood')
  async update(
    @Args('id') id: string,
    @Args('neighborhoodInput') updateNeighborhoodInput: NeighborhoodInput,
  ): Promise<Neighborhood> {
    return await this.neighborhoodService.update(id, updateNeighborhoodInput);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteNeighborhood')
  async delete(@Args('id') id: string): Promise<Neighborhood> {
    return await this.neighborhoodService.delete(id);
  }
}
