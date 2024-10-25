import { AccessLevel } from '../enums/access-level.enum';

export interface OrganizationMembers {
  name: string;
  email: string;
  access_level: AccessLevel;
}
