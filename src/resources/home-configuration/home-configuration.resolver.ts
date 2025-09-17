import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { HomeConfigurationService } from './home-configuration.service';
import {
  HomeConfigurationInput,
  RolesName,
  HomeConfiguration,
  UpdateHomeConfigurationInput,
} from '../../entities';

@Resolver('HomeConfiguration')
export class HomeConfigurationResolver {
  constructor(
    private readonly homeConfigurationService: HomeConfigurationService,
  ) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createHomeConfiguration')
  async create(
    @Args('homeConfigurationInput')
    createHomeConfigurationInput: HomeConfigurationInput,
  ): Promise<HomeConfiguration> {
    return await this.homeConfigurationService.create(
      createHomeConfigurationInput,
    );
  }

  @Query('homeConfigurations')
  async findAll(): Promise<HomeConfiguration[]> {
    return await this.homeConfigurationService.findAll();
  }

  @Query('homeConfiguration')
  async findOne(@Args('id') id: string): Promise<HomeConfiguration | null> {
    return await this.homeConfigurationService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateHomeConfiguration')
  async update(
    @Args('id') id: string,
    @Args('homeConfigurationInput')
    updateHomeConfigurationInput: UpdateHomeConfigurationInput,
  ): Promise<HomeConfiguration | null> {
    return await this.homeConfigurationService.update(
      id,
      updateHomeConfigurationInput,
    );
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteHomeConfiguration')
  async delete(@Args('id') id: string): Promise<HomeConfiguration> {
    return await this.homeConfigurationService.delete(id);
  }
}
