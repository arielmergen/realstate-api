import { RoleInput, Role } from '../../entities';
import { PrismaService } from '../../db/prisma.service';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoleInput: RoleInput): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: string): Promise<Role | null>;
    findGuestRole(): Promise<Role | null>;
    findOwnerRole(): Promise<Role | null>;
    update(id: string, updateRoleInput: RoleInput): Promise<Role>;
    delete(id: string): Promise<Role>;
}
