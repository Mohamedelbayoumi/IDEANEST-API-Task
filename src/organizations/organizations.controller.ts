import {
  Controller,
  Post,
  UseGuards,
  Body,
  Request,
  Get,
  Put,
  Delete,
} from '@nestjs/common';

import { OrganizationsService } from './organizations.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateOrganizationDto } from './dtos/create-organization-dto';

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

    const organizationId = await this.organizationsService.createOrganization(
      name,
      description,
      req.userEmail,
    );

    return { organization_id: organizationId };
  }

  @Get('/:organization_id')
  async getOne() {}

  @Get()
  async getAll() {}

  @Put('/:organization_id')
  async update() {}

  @Delete('/:organization_id')
  async delete() {}

  @Post('/:organization_id/invite')
  async invite() {}
}
