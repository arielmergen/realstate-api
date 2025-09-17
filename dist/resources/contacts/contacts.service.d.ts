import { ContactInput } from '../../entities';
import { PrismaService } from '../../db/prisma.service';
export declare class ContactsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createContactInput: ContactInput): Promise<import("@prisma/client/runtime").GetResult<{
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        message: string;
        phone: number;
        subject: string;
    }, unknown, never> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        message: string;
        phone: number;
        subject: string;
    }, unknown, never> & {})[]>;
    findOne(id: string): Promise<(import("@prisma/client/runtime").GetResult<{
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        message: string;
        phone: number;
        subject: string;
    }, unknown, never> & {}) | null>;
    update(id: string, updateContactInput: ContactInput): Promise<import("@prisma/client/runtime").GetResult<{
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        message: string;
        phone: number;
        subject: string;
    }, unknown, never> & {}>;
    delete(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        message: string;
        phone: number;
        subject: string;
    }, unknown, never> & {}>;
}
