import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Put,
  Delete,
} from '@nestjs/common';

import { OrganizationsService } from './organizations.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('/organization')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create() {}

  @Get('/:organization_id')
  @UseGuards(AuthGuard)
  async getOne() {}

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {}

  @Put('/:organization_id')
  @UseGuards(AuthGuard)
  async update() {}

  @Delete('/:organization_id')
  @UseGuards(AuthGuard)
  async delete() {}
}
