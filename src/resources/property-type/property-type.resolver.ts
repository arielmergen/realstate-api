import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PropertyTypeService } from './property-type.service';
import { PropertyTypeInput, RolesName } from '../../entities';

@Resolver('PropertyType')
export class PropertyTypeResolver {
  constructor(private readonly propertyTypeService: PropertyTypeService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createPropertyType')
  async create(
    @Args('propertyTypeInput')
    propertyTypeInput: PropertyTypeInput,
  ): Promise<PropertyType> {
    return await this.propertyTypeService.create(propertyTypeInput);
  }

  @Query('propertyTypes')
  async findAll(): Promise<PropertyType[]> {
    return await this.propertyTypeService.findAll();
  }

  @Query('propertyType')
  async findOne(@Args('id') id: string): Promise<PropertyType | null> {
    return await this.propertyTypeService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deletePropertyType')
  async delete(@Args('id') id: string): Promise<PropertyType> {
    return await this.propertyTypeService.delete(id);
  }
}
