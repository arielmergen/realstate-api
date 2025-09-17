import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { RolesGuard } from '../../guards';
import { Roles } from '../../decorators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { ContactInput, RolesName } from '../../entities';
import { ContactsService } from './contacts.service';

@Resolver('Contact')
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation('createContact')
  async create(
    @Args('contactInput') createContactInput: ContactInput,
  ): Promise<Contact> {
    return await this.contactsService.create(createContactInput);
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query('contacts')
  async findAll(): Promise<Contact[]> {
    return await this.contactsService.findAll();
  }

  @Roles(RolesName.Executive, RolesName.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Query('contact')
  async findOne(@Args('id') id: string): Promise<Contact | null> {
    return await this.contactsService.findOne(id);
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('updateContact')
  async update(
    @Args('id') id: string,
    @Args('contactInput') updateContactInput: ContactInput,
  ): Promise<Contact> {
    return await this.contactsService.update(id, updateContactInput);
  }

  @Roles(RolesName.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation('deleteContact')
  async delete(@Args('id') id: string): Promise<Contact> {
    return await this.contactsService.delete(id);
  }
}
