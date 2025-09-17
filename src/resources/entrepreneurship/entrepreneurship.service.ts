import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { EntrepreneurshipInput, Entrepreneurship } from '../../entities';

@Injectable()
export class EntrepreneurshipService {
  constructor(private prisma: PrismaService) {}

  async create({
    zone,
    ...entrepreneurshipData
  }: EntrepreneurshipInput): Promise<Entrepreneurship> {
    return await this.prisma.entrepreneurship.create({
      data: {
        ...entrepreneurshipData,
        zone: {
          connect: {
            id: zone,
          },
        },
      },
      include: {
        zone: true,
      },
    });
  }

  async findAll(associatedZoneId: string): Promise<Entrepreneurship[]> {
    return await this.prisma.entrepreneurship.findMany({
      ...(associatedZoneId && {
        where: {
          zone: {
            id: associatedZoneId,
          },
        },
      }),
      include: {
        zone: true,
      },
    });
  }

  async findOne(id: string): Promise<Entrepreneurship | null> {
    return await this.prisma.entrepreneurship.findUnique({
      where: {
        id,
      },
      include: {
        zone: true,
      },
    });
  }

  async update(
    id: string,
    { zone, ...entrepreneurshipData }: EntrepreneurshipInput,
  ) {
    return this.prisma.entrepreneurship.update({
      where: { id },
      data: {
        ...entrepreneurshipData,
        zone: {
          connect: {
            id: zone,
          },
        },
      },
      include: {
        zone: true,
      },
    });
  }

  async delete(id: string): Promise<Entrepreneurship> {
    return await this.prisma.entrepreneurship.delete({
      where: { id },
      include: { zone: true },
    });
  }
}
