import { Owner } from '@prisma/client';
import { OwnerInput } from '../../entities';
import { PrismaService } from '../../db/prisma.service';
export declare class OwnerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOwnerInput: OwnerInput): Promise<Owner>;
    findAll(): Promise<Owner[]>;
    findOne(id: string): Promise<Owner | null>;
    update(id: string, updateOwnerInput: OwnerInput): Promise<Owner>;
    delete(id: string): Promise<Owner>;
}
