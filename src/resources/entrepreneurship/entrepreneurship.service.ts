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

  async findAll(associatedZoneId?: string): Promise<Entrepreneurship[]> {
    try {
      const queryOptions: any = {
        include: {
          zone: true,
        },
        // Agregar límite para prevenir consultas masivas
        take: 100,
        orderBy: {
          name: 'asc',
        },
      };

      // Solo agregar filtro de zona si se proporciona un ID válido
      if (associatedZoneId && associatedZoneId.trim() !== '') {
        queryOptions.where = {
          zone: {
            id: associatedZoneId.trim(),
          },
        };
      }

      const result = await this.prisma.entrepreneurship.findMany(queryOptions);
      
      // Log para monitoreo
      console.log(`📊 Entrepreneurship query executed: ${result.length} results${associatedZoneId ? ` for zone ${associatedZoneId}` : ''}`);
      
      return result;
    } catch (error) {
      console.error('❌ Database error in findAll entrepreneurships:', error);
      throw new Error(`Error al obtener emprendimientos: ${error.message}`);
    }
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
