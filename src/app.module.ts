import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgenciesModule } from './agencies/agencies.module';

@Module({
  imports: [AgenciesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
