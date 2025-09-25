import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';

@Module({
  imports: [HttpModule],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
