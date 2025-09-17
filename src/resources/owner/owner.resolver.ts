import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Owner } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { OwnerInput, RolesName } from '../../entities';
import { OwnerService } from './owner.service';

@Resolver('Owner')
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createOwner')
  async create(
    @Args('ownerInput') createOwnerInput: OwnerInput,
  ): Promise<Owner> {
    return await this.ownerService.create(createOwnerInput);
  }

  @Query('owners')
  async findAll(): Promise<Owner[]> {
    return await this.ownerService.findAll();
  }

  @Query('owner')
  async findOne(@Args('id') id: string): Promise<Owner | null> {
    return await this.ownerService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateOwner')
  async update(
    @Args('id') id: string,
    @Args('ownerInput') updateOwnerInput: OwnerInput,
  ): Promise<Owner> {
    return await this.ownerService.update(id, updateOwnerInput);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteOwner')
  async delete(@Args('id') id: string): Promise<Owner> {
    return await this.ownerService.delete(id);
  }
}
