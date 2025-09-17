import { RolesName } from '../../entities';

export const DEFAULT_ROLE = {
  name: RolesName.Guest,
  description:
    'Default role assigned to every signed in user, it has no privileges for backoffice.',
};
