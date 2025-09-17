import { Injectable } from '@nestjs/common';
import { ContactInput } from '../../entities';
import { PrismaService } from '../../db/prisma.service';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(createContactInput: ContactInput) {
    return await this.prisma.contact.create({ data: createContactInput });
  }

  async findAll() {
    return await this.prisma.contact.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.contact.findUnique({ where: { id } });
  }

  async update(id: string, updateContactInput: ContactInput) {
    return await this.prisma.contact.update({
      where: { id },
      data: updateContactInput,
    });
  }

  async delete(id: string) {
    return await this.prisma.contact.delete({ where: { id } });
  }
}
