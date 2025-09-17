import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { RolesService } from './roles.service';
import { RoleInput, RolesName, Role } from '../../entities';

@Resolver('Role')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createRole')
  async create(@Args('roleInput') createRoleInput: RoleInput): Promise<Role> {
    return await this.rolesService.create(createRoleInput);
  }

  @Roles(RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query('roles')
  async findAll(): Promise<Role[]> {
    return await this.rolesService.findAll();
  }

  @Roles(RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query('role')
  async findOne(@Args('id') id: string): Promise<Role | null> {
    return await this.rolesService.findOne(id);
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateRole')
  async update(
    @Args('id') id: string,
    @Args('roleInput') updateRoleInput: RoleInput,
  ): Promise<Role> {
    return await this.rolesService.update(id, updateRoleInput);
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteRole')
  async delete(@Args('id') id: string): Promise<Role> {
    return await this.rolesService.delete(id);
  }
}
