import { Injectable } from '@nestjs/common';
import { RoleInput, RolesName, Role } from '../../entities';
import { PrismaService } from '../../db/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleInput: RoleInput): Promise<Role> {
    return await this.prisma.role.create({ data: createRoleInput });
  }

  async findAll(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany();

    return roles.filter((role) => role.name !== RolesName.Owner);
  }

  async findOne(id: string): Promise<Role | null> {
    return await this.prisma.role.findUnique({ where: { id } });
  }

  async findGuestRole(): Promise<Role | null> {
    return await this.prisma.role.findFirst({
      where: { name: RolesName.Guest },
    });
  }

  async findOwnerRole(): Promise<Role | null> {
    return await this.prisma.role.findFirst({
      where: { name: RolesName.Owner },
    });
  }

  async update(id: string, updateRoleInput: RoleInput): Promise<Role> {
    return await this.prisma.role.update({
      where: { id },
      data: updateRoleInput,
    });
  }

  async delete(id: string): Promise<Role> {
    return await this.prisma.role.delete({ where: { id } });
  }
}
