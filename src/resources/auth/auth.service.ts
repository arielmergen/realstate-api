import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import {
  User,
  AuthInput,
  RefreshInput,
  Tokens,
  RegisterUserInput,
  UserInput,
} from '../../entities';
import { PrismaService } from '../../db/prisma.service';
import { DEFAULT_ROLE } from '../roles/roles.constants';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { ImagesService } from '../images/images.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private jwt: JwtService,
    private config: ConfigService,
    private imagesService: ImagesService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true, picture: true },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...userData } = user;
      return userData;
    }

    return null;
  }

  async logout(user: UserInput) {
    const _user = await this.usersService.findOne(user.id);

    if (!_user) throw new AuthenticationError('El usuario no existe');

    const { role: _1, picture: _2, ...cuttedUser } = _user;

    await this.usersService.update(
      {
        ...cuttedUser,
        refreshToken: null,
      },
      { validateRole: false },
    );

    return null;
  }

  async login({ email, password }: AuthInput): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true, picture: true },
    });
    if (!user) throw new Error('El usuario no existe');

    const {
      password: _1,
      pictureId: _2,
      roleId: _3,
      ...userWithoutPassword
    } = user as unknown as User & {
      password: string;
      pictureId: string;
      roleId: string;
    };

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throw new Error('La contraseña es incorrecta');

    const tokens = await this.createTokens({
      ...userWithoutPassword,
      id: `${user.id}`,
    });

    await this.usersService.update(
      {
        id: user.id,
        refreshToken: tokens.refreshToken,
        email: user.email,
      },
      { validateRole: false },
    );

    return tokens;
  }

  async googleLogin(): Promise<Tokens> {
    return { accessToken: '', refreshToken: '' };
  }

  async register({
    email,
    password,
    id: _,
    picture,
    ...userData
  }: RegisterUserInput): Promise<Tokens> {
    let _picture;
    const SALT_OR_ROUNDS = 12;
    const hashedPassword = await bcrypt
      .hash(password, SALT_OR_ROUNDS)
      .catch((err) => {
        throw err;
      });

    const emailAlreadyInUse = await this.usersService.findOneByEmail(email);

    if (emailAlreadyInUse)
      throw new Error('El correo electrónico se encuentra en uso');

    const guestRole = await this.rolesService.findGuestRole();

    if (picture) _picture = await this.imagesService.create(picture, '/users');

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        email,
        role: {
          ...(guestRole && guestRole.id
            ? {
                connect: {
                  id: guestRole.id,
                },
              }
            : {
                create: DEFAULT_ROLE,
              }),
        },
        password: hashedPassword,
        ...(_picture?.id && { picture: { connect: { id: _picture.id } } }),
      },
      include: {
        role: true,
        picture: true,
      },
    });
    const { password: _1, roleId: _2, id, ...userCutted } = user;

    const { accessToken, refreshToken } = await this.createTokens({
      ...userCutted,
      id: `${id}`,
    });

    await this.usersService.update({
      id,
      refreshToken,
      email: userCutted.email,
    });

    return { accessToken, refreshToken };
  }

  async refreshSession(
    user: User | UserInput,
    refreshInput: RefreshInput,
  ): Promise<Tokens> {
    const _user = await this.usersService.findOne(user.id);

    if (!_user) throw new Error('User not found');
    if (_user.refreshToken !== refreshInput.refreshToken) {
      await this.usersService.update(
        {
          id: user.id,
          email: _user.email,
          refreshToken: null,
        },
        { validateRole: false },
      );

      throw new Error('Session could not be refreshed');
    }

    const {
      id,
      exp: _,
      password: _1,
      roleId: _2,
      pictureId: _3,
      refreshToken: _4,
      ...userCutted
    } = _user as User & {
      exp: number;
      password: string;
      roleId: string;
      pictureId: string;
    };
    const tokens = await this.createTokens({
      ...userCutted,
      id: `${id}`,
    });

    return tokens;
  }

  async refresh(user: User, refreshInput: RefreshInput): Promise<Tokens> {
    const tokens = await this.refreshSession(user, refreshInput);

    await this.usersService.update(
      {
        id: user.id,
        email: user.email,
        refreshToken: tokens.refreshToken,
      },
      { validateRole: false },
    );

    return tokens;
  }

  async updateSession(
    user: UserInput,
    refreshInput: RefreshInput,
  ): Promise<Tokens> {
    const _user = await this.usersService.update(
      {
        ...user,
        ...(typeof user.role === 'string' && { role: user.role }),
      },
      { validateRole: false, imageFolder: '/users' },
    );

    const tokens = await this.refreshSession(_user, refreshInput);

    await this.usersService.update(
      {
        id: _user.id,
        email: _user.email,
        refreshToken: tokens.refreshToken,
      },
      { validateRole: false },
    );

    return tokens;
  }

  async createTokens(userCutted: User) {
    const accessToken = this.jwt.sign(userCutted, {
      expiresIn: `${this.config.get<number>(
        'TOKEN_VALIDITY_TIME',
      )}${this.config.get<string>('TOKEN_VALIDITY_UNITS')}`,
    });
    const refreshToken = this.jwt.sign(
      {},
      {
        expiresIn: `${this.config.get<number>(
          'REFRESH_TOKEN_VALIDITY_TIME',
        )}${this.config.get<string>('REFRESH_TOKEN_VALIDITY_UNITS')}`,
      },
    );

    return { accessToken, refreshToken };
  }
}
