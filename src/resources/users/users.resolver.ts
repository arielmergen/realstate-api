import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { UsersService } from './users.service';
import { UserInput, RolesName, User } from '../../entities';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query('users')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query('user')
  async findOne(@Args('id') id: string): Promise<User | null> {
    return await this.usersService.findOne(id);
  }

  @Roles(RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateUser')
  async update(@Args('userInput') updateUserInput: UserInput): Promise<User> {
    return await this.usersService.update(updateUserInput);
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteUser')
  async delete(@Args('id') id: string): Promise<User> {
    return await this.usersService.delete(id);
  }
}
