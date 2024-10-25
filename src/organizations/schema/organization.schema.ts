import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

import { OrganizationMembers } from '../interfaces/organization-members.interface';
import { AccessLevel } from '../enums/access-level.enum';

@Schema()
export class Organization {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: [
      {
        name: { type: String },
        email: { type: String },
        access_level: { type: String, enum: AccessLevel },
      },
    ],
    _id: false,
    required: true,
  })
  organization_members: OrganizationMembers[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
