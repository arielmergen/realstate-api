import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import {
  GeneralConfigurationInput,
  GeneralConfiguration,
} from '../../entities';

@Injectable()
export class GeneralConfigurationService {
  constructor(private prisma: PrismaService) {}

  async create(
    createGeneralConfigurationInput: GeneralConfigurationInput,
  ): Promise<GeneralConfiguration> {
    return await this.prisma.generalConfiguration.create({
      data: createGeneralConfigurationInput,
    });
  }

  async findAll(): Promise<GeneralConfiguration[]> {
    return await this.prisma.generalConfiguration.findMany();
  }

  async findOne(id: string): Promise<GeneralConfiguration | null> {
    return await this.prisma.generalConfiguration.findUnique({
      where: { id },
    });
  }

  async update(
    updateGeneralConfigurationInput: GeneralConfigurationInput,
  ): Promise<GeneralConfiguration> {
    await this.prisma.generalConfiguration.deleteMany({});

    return await this.create(updateGeneralConfigurationInput);
  }

  async delete(id: string): Promise<GeneralConfiguration> {
    return await this.prisma.generalConfiguration.delete({
      where: { id },
    });
  }
}
