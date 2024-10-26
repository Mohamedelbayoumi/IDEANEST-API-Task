import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
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

  async create(name: string, description: string, userEmail: string) {
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

  async getOne(id: string, userEmail: string) {
    const organization = await this.organizationModel
      .findById(id)
      .select('name description organization_members');

    if (!organization) {
      throw new NotFoundException('organization does not exist ');
    }

    organization.organization_members.forEach((member) => {
      if (userEmail !== member.email) {
        throw new UnauthorizedException(
          'You are not allowed to access this resource',
        );
      }
    });

    return organization;
  }

  async getAll(userEmail: string) {
    const organizations = await this.organizationModel
      .find()
      .select('name description organization_members')
      .lean();

    if (!organizations) {
      throw new NotFoundException('there is no organization found ');
    }

    const allowedOrganizations = [];

    organizations.forEach((organization) => {
      for (let member of organization.organization_members) {
        if (userEmail === member.email) {
          allowedOrganizations.push({
            organization_id: organization._id,
            name: organization.name,
            description: organization.description,
            organization_members: organization.organization_members,
          });
          break;
        }
      }
    });

    return allowedOrganizations;
  }

  async update(
    id: string,
    name: string,
    description: string,
    userEmail: string,
  ) {
    const organization = await this.organizationModel
      .findById(id)
      .select('name decription organization_members');

    if (!organization) {
      throw new NotFoundException('organization does not exist ');
    }

    const organizationMember = organization.organization_members[0];

    if (organizationMember.email !== userEmail) {
      throw new UnauthorizedException(
        'You are not allowed to update this resource',
      );
    }

    organization.name = name;
    organization.description = description;
    await organization.save();
    return organization;
  }

  async delete(id: string, userEmail: string) {
    const organization = await this.organizationModel.findById(id);

    if (!organization) {
      throw new NotFoundException('organization does not exist ');
    }

    const organizationMember = organization.organization_members[0];

    if (organizationMember.email !== userEmail) {
      throw new UnauthorizedException(
        'You are not allowed to delete this resource',
      );
    }
    await organization.deleteOne();
  }
}
