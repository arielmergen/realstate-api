import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, AuthInput, RefreshInput, Tokens, RegisterUserInput, UserInput } from '../../entities';
import { PrismaService } from '../../db/prisma.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { ImagesService } from '../images/images.service';
export declare class AuthService {
    private prisma;
    private usersService;
    private rolesService;
    private jwt;
    private config;
    private imagesService;
    constructor(prisma: PrismaService, usersService: UsersService, rolesService: RolesService, jwt: JwtService, config: ConfigService, imagesService: ImagesService);
    validateUser(email: string, password: string): Promise<any>;
    logout(user: UserInput): Promise<null>;
    login({ email, password }: AuthInput): Promise<Tokens>;
    googleLogin(): Promise<Tokens>;
    register({ email, password, id, picture, ...userData }: RegisterUserInput): Promise<Tokens>;
    refreshSession(user: User | UserInput, refreshInput: RefreshInput): Promise<Tokens>;
    refresh(user: User, refreshInput: RefreshInput): Promise<Tokens>;
    updateSession(user: UserInput, refreshInput: RefreshInput): Promise<Tokens>;
    createTokens(userCutted: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
