import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { PrismaService } from '../../db/prisma.service';
import { ServiceInput } from '../../entities';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create({ types, ...serviceData }: ServiceInput): Promise<Service> {
    return await this.prisma.service.create({
      data: {
        ...serviceData,
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

  async findAll(): Promise<Service[]> {
    return await this.prisma.service.findMany({
      include: {
        types: true,
      },
    });
  }

  async findOne(id: string): Promise<Service | null> {
    return await this.prisma.service.findUnique({
      where: { id },
      include: {
        types: true,
      },
    });
  }

  async update(id: string, { types, ...serviceData }: ServiceInput) {
    return this.prisma.service.update({
      where: {
        id,
      },
      data: {
        ...serviceData,
        ...(types?.length && {
          types: {
            connect: types.map((id) => ({
              id: id,
            })),
          },
        }),
      },
    });
  }

  async delete(id: string) {
    return this.prisma.service.delete({ where: { id } });
  }
}
