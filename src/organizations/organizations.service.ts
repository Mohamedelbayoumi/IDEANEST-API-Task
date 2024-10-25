import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Organization } from './schema/organization.schema';
import { UsersService } from '../users/users.service';
import { AccessLevel } from './enums/access-level.enum';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
    private usersService: UsersService,
  ) {}

  async createOrganization(
    name: string,
    description: string,
    userEmail: string,
  ) {
    const user = await this.usersService.findUserByEmail(userEmail);

    const organizationMembers = [
      {
        name: user.name,
        email: user.email,
        access_level: AccessLevel.ReadAndWrite,
      },
    ];

    const organization = await this.organizationModel.create({
      name,
      description,
      organization_members: organizationMembers,
    });

    console.log(organization);

    return organization._id;
  }
}
