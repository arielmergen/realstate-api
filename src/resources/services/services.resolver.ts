import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { ServicesService } from './services.service';
import { RolesName, ServiceInput } from '../../entities';
import { Service } from '@prisma/client';

@Resolver('Service')
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createService')
  async create(
    @Args('serviceInput') createServiceInput: ServiceInput,
  ): Promise<Service> {
    return await this.servicesService.create(createServiceInput);
  }

  @Query('services')
  async findAll(): Promise<Service[]> {
    return await this.servicesService.findAll();
  }

  @Query('service')
  async findOne(@Args('id') id: string): Promise<Service | null> {
    return await this.servicesService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateService')
  async update(
    @Args('id') id: string,
    @Args('serviceInput') updateServiceInput: ServiceInput,
  ): Promise<Service> {
    return await this.servicesService.update(id, updateServiceInput);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteService')
  async delete(@Args('id') id: string): Promise<Service> {
    return await this.servicesService.delete(id);
  }
}
