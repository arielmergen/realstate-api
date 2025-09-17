import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import {
  GeneralConfigurationInput,
  RolesName,
  GeneralConfiguration,
} from 'src/entities';
import { GeneralConfigurationService } from './general-configuration.service';

@Resolver('GeneralConfiguration')
export class GeneralConfigurationResolver {
  constructor(
    private readonly generalConfigurationService: GeneralConfigurationService,
  ) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createGeneralConfiguration')
  async create(
    @Args('generalConfigurationInput')
    createGeneralConfigurationInput: GeneralConfigurationInput,
  ): Promise<GeneralConfiguration> {
    return await this.generalConfigurationService.create(
      createGeneralConfigurationInput,
    );
  }

  @Query('generalConfigurations')
  async findAll(): Promise<GeneralConfiguration[]> {
    return await this.generalConfigurationService.findAll();
  }

  @Query('generalConfiguration')
  async findOne(@Args('id') id: string): Promise<GeneralConfiguration | null> {
    return await this.generalConfigurationService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateGeneralConfiguration')
  async update(
    @Args('generalConfigurationInput')
    updateGeneralConfigurationInput: GeneralConfigurationInput,
  ): Promise<GeneralConfiguration> {
    return await this.generalConfigurationService.update(
      updateGeneralConfigurationInput,
    );
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteGeneralConfiguration')
  async delete(@Args('id') id: string): Promise<GeneralConfiguration> {
    return await this.generalConfigurationService.delete(id);
  }
}
