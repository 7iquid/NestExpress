import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Logger,
} from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/response-profile.dto';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
  private readonly logger = new Logger(ProfilesController.name);

  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Profile created',
    type: ProfileResponseDto,
  })
  async create(
    @Body() dto: CreateProfileDto,
  ): Promise<{ statusCode: number; data: ProfileResponseDto }> {
    this.logger.log(`POST /profiles called with username: ${dto.username}`);
    const profile = await this.profilesService.create(dto);
    return { statusCode: 201, data: profile };
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Single profile',
    type: ProfileResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; data: ProfileResponseDto }> {
    this.logger.log(`GET /profiles/${id} called`);
    const profile = await this.profilesService.findOne(id);
    return { statusCode: 200, data: profile };
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Updated profile',
    type: ProfileResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<{ statusCode: number; data: ProfileResponseDto }> {
    this.logger.log(`PUT /profiles/${id} called`);
    const profile = await this.profilesService.update(id, dto);
    return { statusCode: 200, data: profile };
  }

  @Get()
  @ApiOkResponse({
    description: 'List of profiles',
    type: [ProfileResponseDto],
  })
  async findAll(): Promise<{ statusCode: number; data: ProfileResponseDto[] }> {
    this.logger.log('GET /profiles called');
    const profiles = await this.profilesService.findAll();
    return { statusCode: 200, data: profiles };
  }
}
