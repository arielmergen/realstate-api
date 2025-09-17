import { Contact } from '@prisma/client';
import { ContactInput } from '../../entities';
import { ContactsService } from './contacts.service';
export declare class ContactsResolver {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    create(createContactInput: ContactInput): Promise<Contact>;
    findAll(): Promise<Contact[]>;
    findOne(id: string): Promise<Contact | null>;
    update(id: string, updateContactInput: ContactInput): Promise<Contact>;
    delete(id: string): Promise<Contact>;
}
