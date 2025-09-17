import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import {
  FeatureInput,
  RolesName,
  Feature,
  UpdateFeatureInput,
} from '../../entities';
import { FeaturesService } from './features.service';

@Resolver('Feature')
export class FeaturesResolver {
  constructor(private readonly featuresService: FeaturesService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createFeature')
  async create(
    @Args('featureInput') createFeatureInput: FeatureInput,
  ): Promise<Feature> {
    return await this.featuresService.create(createFeatureInput);
  }

  @Query('features')
  async findAll(): Promise<Feature[]> {
    return await this.featuresService.findAll();
  }

  @Query('feature')
  async findOne(@Args('id') id: string): Promise<Feature | null> {
    return await this.featuresService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateFeature')
  async update(
    @Args('id') id: string,
    @Args('featureInput') updateFeatureInput: UpdateFeatureInput,
  ): Promise<Feature> {
    return await this.featuresService.update(id, updateFeatureInput);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteFeature')
  async delete(@Args('id') id: string): Promise<Feature> {
    return await this.featuresService.delete(id);
  }
}
