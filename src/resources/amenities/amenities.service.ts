import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { AmenityInput } from '../../entities';
import { Amenity } from '@prisma/client';

@Injectable()
export class AmenitiesService {
  constructor(private prisma: PrismaService) {}

  async create(
    { types, ...amenityData }: AmenityInput = { types: [], name: '' },
  ): Promise<Amenity> {
    return await this.prisma.amenity.create({
      data: {
        ...amenityData,
        ...(types?.length && {
          types: {
            connect: types.map((id) => ({
              id: id,
            })),
          },
        }),
      },
      include: {
        types: true,
      },
    });
  }

  async findAll(): Promise<Amenity[]> {
    return await this.prisma.amenity.findMany({
      include: {
        types: true,
      },
    });
  }

  async findOne(id: string): Promise<Amenity | null> {
    return await this.prisma.amenity.findUnique({
      where: { id },
      include: {
        types: true,
      },
    });
  }

  async update(
    id: string,
    { types, ...amenityData }: AmenityInput = { types: [], name: '' },
  ): Promise<Amenity> {
    const amenity = await this.prisma.amenity.findUnique({
      where: { id },
      include: { types: true },
    });

    if (amenity?.types.length)
      await this.prisma.amenity.update({
        where: { id },
        data: {
          types: {
            disconnect: amenity.types.map(({ id }) => ({
              id: id,
            })),
          },
        },
      });

    return this.prisma.amenity.update({
      where: { id },
      data: {
        ...amenityData,
        ...(types?.length && {
          types: {
            connect: types.map((id) => ({
              id: id,
            })),
          },
        }),
      },
      include: {
        types: true,
      },
    });
  }

  async delete(id: string): Promise<Amenity> {
    return await this.prisma.amenity.delete({
      where: { id },
      include: {
        types: true,
      },
    });
  }
}
