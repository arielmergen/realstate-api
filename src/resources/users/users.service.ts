import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { RolesName, UserInput, User } from '../../entities';
import * as bcrypt from 'bcrypt';
import { ImagesService } from '../images/images.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private imagesService: ImagesService,
  ) {}

  private include = {
    role: true,
    picture: true,
  };

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ include: this.include });
    return users.map(
      ({
        refreshToken: _1,
        roleId: _2,
        pictureId: _3,
        password: _4,
        ...user
      }) => {
        return user;
      },
    );
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const _user = await this.prisma.user.findUnique({
      where: { email },
      include: this.include,
    });

    if (!_user) return null;
    const { password, ...user } = _user;

    return user;
  }

  async findOne(id: string): Promise<User | null> {
    const _user = await this.prisma.user.findUnique({
      where: { id },
      include: this.include,
    });

    if (!_user) return null;
    const { password: _1, ...user } = _user;

    return user;
  }

  async update(
    {
      password,
      newPassword,
      role,
      picture,
      oldPicture,
      ...userData
    }: UserInput,
    {
      validateRole,
      imageFolder,
    }: { validateRole: boolean; imageFolder?: string } = { validateRole: true },
  ): Promise<User> {
    const SALT_OR_ROUNDS = 12;
    let newHashedPassword = '';
    let _role;
    let _picture;

    const _user = await this.prisma.user.findUnique({
      where: { id: userData.id },
      include: this.include,
    });
    if (role)
      _role = await this.prisma.role.findUnique({ where: { id: role } });
    if (validateRole && _user?.role.name === RolesName.Owner)
      throw new Error('You cannot modify owner users!');
    if (_role?.name === RolesName.Owner) throw new Error('Watch out...');
    if (
      userData.email &&
      userData.email !== _user?.email &&
      (await this.findOneByEmail(userData.email))
    )
      throw new Error('El email esta en uso.');

    if (
      password &&
      _user?.password &&
      !(await bcrypt.compare(password, _user.password))
    )
      throw new Error('Password does not match');

    if (newPassword && password)
      newHashedPassword = await bcrypt
        .hash(newPassword, SALT_OR_ROUNDS)
        .catch((err) => {
          throw err;
        });

    if (picture)
      _picture = await this.imagesService.create(
        picture,
        imageFolder || '/users',
      );
    if (oldPicture?.publicId)
      await this.imagesService.delete(oldPicture.publicId);

    const __user = await this.prisma.user.update({
      where: { id: userData.id },
      data: {
        ...userData,
        ...(!!newHashedPassword && { password: newHashedPassword }),
        ...(role && { role: { connect: { id: role } } }),
        ...(_picture?.id && { picture: { connect: { id: _picture.id } } }),
      },
      include: this.include,
    });

    const { password: _1, pictureId: _2, roleId: _3, ...user } = __user;

    return user;
  }

  async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
      include: this.include,
    });
  }
}
