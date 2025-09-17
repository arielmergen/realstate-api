import { PrismaService } from '../../db/prisma.service';
import { UserInput, User } from '../../entities';
import { ImagesService } from '../images/images.service';
export declare class UsersService {
    private prisma;
    private imagesService;
    constructor(prisma: PrismaService, imagesService: ImagesService);
    private include;
    findAll(): Promise<User[]>;
    findOneByEmail(email: string): Promise<User | null>;
    findOne(id: string): Promise<User | null>;
    update({ password, newPassword, role, picture, oldPicture, ...userData }: UserInput, { validateRole, imageFolder, }?: {
        validateRole: boolean;
        imageFolder?: string;
    }): Promise<User>;
    delete(id: string): Promise<User>;
}
