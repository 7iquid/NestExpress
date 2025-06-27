import {
  Controller,
  Get,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('agencies')
export class AgenciesController {
  private readonly logger = new Logger(AgenciesController.name);

  constructor(private readonly agenciesService: AgenciesService) {}

  @Get('report')
  @UseInterceptors(CacheInterceptor)
  async getReport() {
    this.logger.log('Generating report...');
    return this.agenciesService.generateReport();
  }

  @ApiBearerAuth()
  @UseInterceptors(CacheInterceptor)
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  async getList() {
    this.logger.log('Generating report...');
    return [
      { test: 'test', id: 1 },
      { test: 'test2', id: 2 },
    ];
  }
}
