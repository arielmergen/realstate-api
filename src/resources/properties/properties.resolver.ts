import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard, CreatedByGuard } from '../../guards';
import { Roles } from '../../decorators';
import { PropertiesService } from './properties.service';
import {
  PropertyFiltersInput,
  PropertyInput,
  RolesName,
  Property,
  PropertyResponse,
} from '../../entities';

@Resolver('Property')
export class PropertiesResolver {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createProperty')
  async create(
    @Args('propertyInput') createPropertyInput: PropertyInput,
  ): Promise<Property> {
    return await this.propertiesService.create(createPropertyInput);
  }

  @Query('properties')
  async findAll(
    @Args('filters') filters: PropertyFiltersInput,
    @Args('first') first: number,
    @Args('after') after: string,
  ): Promise<PropertyResponse> {
    return await this.propertiesService.findAll(filters, first, after);
  }

  @Query('property')
  async findOne(@Args('id') id: string): Promise<Property | null> {
    return await this.propertiesService.findOne(id);
  }

  @Query('propertyWithOrderedImages')
  async findOneWithOrderedImages(@Args('id') id: string): Promise<Property | null> {
    return await this.propertiesService.findOneWithOrderedImages(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateProperty')
  async update(
    @Args('id') id: string,
    @Args('propertyInput') updatePropertyInput: PropertyInput,
  ): Promise<Property> {
    return await this.propertiesService.update(id, updatePropertyInput);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard, CreatedByGuard)
  @Mutation('deleteProperty')
  async delete(@Args('id') id: string): Promise<Property> {
    return await this.propertiesService.delete(id);
  }
}
