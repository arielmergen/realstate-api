import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { NeighborhoodInput, Neighborhood } from '../../entities';

@Injectable()
export class NeighborhoodService {
  constructor(private prisma: PrismaService) {}

  async create({
    entrepreneurship,
    ...neighborhoodData
  }: NeighborhoodInput): Promise<Neighborhood> {
    return await this.prisma.neighborhood.create({
      data: {
        ...neighborhoodData,
        entrepreneurship: {
          connect: {
            id: entrepreneurship,
          },
        },
      },
      include: {
        entrepreneurship: true,
      },
    });
  }

  async findAll(associatedEntrepreneurshipId: string): Promise<Neighborhood[]> {
    return await this.prisma.neighborhood.findMany({
      ...(associatedEntrepreneurshipId && {
        where: {
          entrepreneurship: {
            id: associatedEntrepreneurshipId,
          },
        },
      }),
      include: {
        entrepreneurship: true,
      },
    });
  }

  async findOne(id: string): Promise<Neighborhood | null> {
    return this.prisma.neighborhood.findUnique({
      where: {
        id,
      },
      include: {
        entrepreneurship: true,
      },
    });
  }

  async update(
    id: string,
    { entrepreneurship, ...neighborhoodData }: NeighborhoodInput,
  ): Promise<Neighborhood> {
    return this.prisma.neighborhood.update({
      where: {
        id,
      },
      data: {
        ...neighborhoodData,
        entrepreneurship: {
          connect: {
            id: entrepreneurship,
          },
        },
      },
      include: {
        entrepreneurship: true,
      },
    });
  }

  async delete(id: string): Promise<Neighborhood> {
    return this.prisma.neighborhood.delete({ where: { id } });
  }
}
