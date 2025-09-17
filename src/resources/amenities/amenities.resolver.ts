import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Amenity } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { AmenitiesService } from './amenities.service';
import { AmenityInput, RolesName } from '../../entities';

@Resolver('Amenity')
export class AmenitiesResolver {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createAmenity')
  async create(
    @Args('amenityInput') createAmenityInput: AmenityInput,
  ): Promise<Amenity> {
    return await this.amenitiesService.create(createAmenityInput);
  }

  @Query('amenities')
  async findAll(): Promise<Amenity[]> {
    return await this.amenitiesService.findAll();
  }

  @Query('amenity')
  async findOne(@Args('id') id: string): Promise<Amenity | null> {
    return await this.amenitiesService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateAmenity')
  async update(
    @Args('id') id: string,
    @Args('amenityInput') amenityInput: AmenityInput,
  ): Promise<Amenity> {
    return await this.amenitiesService.update(id, amenityInput);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteAmenity')
  async remove(@Args('id') id: string): Promise<Amenity> {
    return await this.amenitiesService.delete(id);
  }
}
