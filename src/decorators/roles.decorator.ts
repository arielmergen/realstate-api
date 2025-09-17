import { SetMetadata } from '@nestjs/common';
import { RolesName } from '../entities/';

export const Roles = (...roles: RolesName[]) => SetMetadata('roles', roles);
