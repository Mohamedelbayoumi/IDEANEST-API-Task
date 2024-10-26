import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { OrganizationsService } from './organizations.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateOrganizationDto } from './dtos/create-organization-dto';
import { UpdateOrganizationDto } from './dtos/update-organization-dto';

@Controller('/organization')
@UseGuards(AuthGuard)
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Post()
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @Request() req,
  ) {
    const { name, description } = createOrganizationDto;

    const organizationId = await this.organizationsService.create(
      name,
      description,
      req.userEmail,
    );

    return { organization_id: organizationId };
  }

  @Get('/:organization_id')
  async getOne(
    @Param('organization_id') organizationId: string,
    @Request() req,
  ) {
    const organization = await this.organizationsService.getOne(
      organizationId,
      req.userEmail,
    );
    return {
      organization_id: organization._id,
      name: organization.name,
      description: organization.description,
      organization_members: organization.organization_members,
    };
  }

  @Get()
  async getAll(@Request() req) {
    const organizations = await this.organizationsService.getAll(req.userEmail);
    return organizations;
  }

  @Put('/:organization_id')
  async update(
    @Param('organization_id') organizationId: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
    @Request() req,
  ) {
    const { name, description } = updateOrganizationDto;
    const organization = await this.organizationsService.update(
      organizationId,
      name,
      description,
      req.userEmail,
    );

    return {
      organization_id: organization._id,
      name: organization.name,
      description: organization.description,
    };
  }

  @Delete('/:organization_id')
  async delete(
    @Param('organization_id') organizationId: string,
    @Request() req,
  ) {
    await this.organizationsService.delete(organizationId, req.userEmail);
    return { message: 'organization deleted successfully' };
  }

  @Post('/:organization_id/invite')
  async invite() {}
}
