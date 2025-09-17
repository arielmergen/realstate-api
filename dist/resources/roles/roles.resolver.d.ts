import { RolesService } from './roles.service';
import { RoleInput, Role } from '../../entities';
export declare class RolesResolver {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleInput: RoleInput): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: string): Promise<Role | null>;
    update(id: string, updateRoleInput: RoleInput): Promise<Role>;
    delete(id: string): Promise<Role>;
}
