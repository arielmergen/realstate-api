import { Owner } from '@prisma/client';
import { OwnerInput } from '../../entities';
import { OwnerService } from './owner.service';
export declare class OwnerResolver {
    private readonly ownerService;
    constructor(ownerService: OwnerService);
    create(createOwnerInput: OwnerInput): Promise<Owner>;
    findAll(): Promise<Owner[]>;
    findOne(id: string): Promise<Owner | null>;
    update(id: string, updateOwnerInput: OwnerInput): Promise<Owner>;
    delete(id: string): Promise<Owner>;
}
