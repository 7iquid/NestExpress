import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Logger,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  private readonly logger = new Logger(ProfilesController.name);

  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  async create(@Body() dto: CreateProfileDto) {
    this.logger.log(`POST /profiles called with username: ${dto.username}`);
    const profile = await this.profilesService.create(dto);
    return { statusCode: 201, data: profile };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`GET /profiles/${id} called`);
    const profile = await this.profilesService.findOne(id);
    return { statusCode: 200, data: profile };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    this.logger.log(`PUT /profiles/${id} called`);
    const profile = await this.profilesService.update(id, dto);
    return { statusCode: 200, data: profile };
  }

  @Get()
  async findAll() {
    this.logger.log('GET /profiles called');
    const profiles = await this.profilesService.findAll();
    return { statusCode: 200, data: profiles };
  }
}
