import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { ZoneInput, Zone } from '../../entities';

@Injectable()
export class ZonesService {
  constructor(private prisma: PrismaService) {}

  async create(createZoneInput: ZoneInput): Promise<Zone> {
    return await this.prisma.zone.create({ data: createZoneInput });
  }

  async findAll(): Promise<Zone[]> {
    return await this.prisma.zone.findMany();
  }

  async findOne(id: string): Promise<Zone | null> {
    return await this.prisma.zone.findUnique({ where: { id } });
  }

  async update(id: string, updateZoneInput: ZoneInput): Promise<Zone> {
    return await this.prisma.zone.update({
      where: { id },
      data: updateZoneInput,
    });
  }

  async delete(id: string): Promise<Zone> {
    return await this.prisma.zone.delete({ where: { id } });
  }
}
