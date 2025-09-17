import { Injectable } from '@nestjs/common';
import { Owner } from '@prisma/client';
import { OwnerInput } from '../../entities';
import { PrismaService } from '../../db/prisma.service';

@Injectable()
export class OwnerService {
  constructor(private prisma: PrismaService) {}

  async create(createOwnerInput: OwnerInput): Promise<Owner> {
    return await this.prisma.owner.create({
      data: { properties: undefined, ...createOwnerInput },
    });
  }

  async findAll(): Promise<Owner[]> {
    return await this.prisma.owner.findMany();
  }

  async findOne(id: string): Promise<Owner | null> {
    return this.prisma.owner.findUnique({ where: { id } });
  }

  async update(id: string, updateOwnerInput: OwnerInput): Promise<Owner> {
    // TODO: check if properties are not needed when updating owner (delete).
    return this.prisma.owner.update({
      where: { id },
      data: { ...updateOwnerInput },
    });
  }

  async delete(id: string): Promise<Owner> {
    return this.prisma.owner.delete({ where: { id } });
  }
}
