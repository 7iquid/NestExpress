import { Controller, Get } from '@nestjs/common';
import { AgenciesService } from './agencies.service';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get()
  async getAll() {
    return await this.agenciesService.getAgencies();
  }
}
