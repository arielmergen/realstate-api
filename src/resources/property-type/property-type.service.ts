import { Global, Injectable } from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { PrismaService } from '../../db/prisma.service';
import { PropertyTypeInput, State } from '../../entities';

@Global()
@Injectable()
export class PropertyTypeService {
  constructor(private prisma: PrismaService) {}

  async create({
    states = Object.values(State),
    ...propertyTypeData
  }: PropertyTypeInput): Promise<PropertyType> {
    return await this.prisma.propertyType.create({
      data: {
        ...propertyTypeData,
        ...(states != null && {
          states,
        }),
      },
    });
  }

  async findAll(): Promise<PropertyType[]> {
    return await this.prisma.propertyType.findMany();
  }

  async findOne(id: string): Promise<PropertyType | null> {
    return await this.prisma.propertyType.findUnique({ where: { id } });
  }

  async delete(id: string): Promise<PropertyType> {
    return await this.prisma.propertyType.delete({ where: { id } });
  }
}
