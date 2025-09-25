import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LogRequest } from './log-request.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @LogRequest('Custom route hit!')
  getHello(): string {
    return this.appService.getHello();
  }
}
