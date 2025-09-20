import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { RolesGuard, RateLimitGuard, QueryComplexityGuard } from '../../guards';
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

  @UseGuards(RateLimitGuard, QueryComplexityGuard)
  @Query('entrepreneurships')
  async findAll(
    @Args('associatedZone') associatedZoneId: string,
  ): Promise<Entrepreneurship[]> {
    try {
      // Validar input
      if (associatedZoneId && typeof associatedZoneId !== 'string') {
        throw new HttpException(
          {
            message: 'ID de zona inválido',
            code: 'INVALID_ZONE_ID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // Limpiar y validar el ID de zona
      const cleanZoneId = associatedZoneId?.trim();
      if (cleanZoneId === '') {
        throw new HttpException(
          {
            message: 'ID de zona no puede estar vacío',
            code: 'EMPTY_ZONE_ID',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.entrepreneurshipService.findAll(cleanZoneId);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      
      console.error('❌ Error in entrepreneurships query:', error);
      throw new HttpException(
        {
          message: 'Error interno del servidor al obtener emprendimientos',
          code: 'INTERNAL_SERVER_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
