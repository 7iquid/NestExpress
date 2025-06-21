import { Controller, Get, Logger } from '@nestjs/common';
import { AgenciesService } from './agencies.service';

@Controller('agencies')
export class AgenciesController {
  private readonly logger = new Logger(AgenciesController.name);

  constructor(private readonly agenciesService: AgenciesService) {}

  @Get('report')
  async getReport() {
    this.logger.log('Generating report...');
    return this.agenciesService.generateReport();
  }
}
