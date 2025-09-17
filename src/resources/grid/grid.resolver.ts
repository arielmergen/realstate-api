import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { GridInput, RolesName, Grid, UpdateGridInput } from '../../entities';
import { GridService } from './grid.service';

@Resolver('Grid')
export class GridResolver {
  constructor(private readonly gridService: GridService) {}

  @Roles(RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('createGrid')
  async create(@Args('gridInput') createGridInput: GridInput): Promise<Grid> {
    return await this.gridService.create({
      ...createGridInput,
      imageFolder: '',
    });
  }

  @Query('grids')
  async findAll(): Promise<Grid[]> {
    return await this.gridService.findAll();
  }

  @Query('grid')
  async findOne(@Args('id') id: string): Promise<Grid | null> {
    return await this.gridService.findOne(id);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateGrid')
  async update(
    @Args('id') id: string,
    @Args('gridInput') updateGridInput: UpdateGridInput,
  ): Promise<Grid> {
    return await this.gridService.update(id, {
      ...updateGridInput,
      imageFolder: '',
    });
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteGrid')
  async delete(@Args('id') id: string): Promise<Grid> {
    return await this.gridService.delete(id);
  }
}
