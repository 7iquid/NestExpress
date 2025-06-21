import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

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
}
