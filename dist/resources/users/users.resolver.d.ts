import { UsersService } from './users.service';
import { UserInput, User } from '../../entities';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    update(updateUserInput: UserInput): Promise<User>;
    delete(id: string): Promise<User>;
}
