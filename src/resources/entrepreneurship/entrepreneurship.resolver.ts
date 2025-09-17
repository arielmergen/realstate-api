import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { EntrepreneurshipService } from './entrepreneurship.service';
import {
  EntrepreneurshipInput,
  RolesName,
  Entrepreneurship,
} from '../../entities';

@Resolver('Entrepreneurship')
export class EntrepreneurshipResolver {
  constructor(
    private readonly entrepreneurshipService: EntrepreneurshipService,
  ) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createEntrepreneurship')
  async create(
    @Args('entrepreneurshipInput')
    createEntrepreneurshipInput: EntrepreneurshipInput,
  ): Promise<Entrepreneurship> {
    return await this.entrepreneurshipService.create(
      createEntrepreneurshipInput,
    );
  }

  @Query('entrepreneurships')
  async findAll(
    @Args('associatedZone') associatedZoneId: string,
  ): Promise<Entrepreneurship[]> {
    return await this.entrepreneurshipService.findAll(associatedZoneId);
  }

  @Query('entrepreneurship')
  async findOne(@Args('id') id: string): Promise<Entrepreneurship | null> {
    return await this.entrepreneurshipService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateEntrepreneurship')
  async update(
    @Args('id') id: string,
    @Args('entrepreneurshipInput')
    updateEntrepreneurshipInput: EntrepreneurshipInput,
  ): Promise<Entrepreneurship> {
    return await this.entrepreneurshipService.update(
      id,
      updateEntrepreneurshipInput,
    );
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteEntrepreneurship')
  async delete(@Args('id') id: string): Promise<Entrepreneurship> {
    return await this.entrepreneurshipService.delete(id);
  }
}
