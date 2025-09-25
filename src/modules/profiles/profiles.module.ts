import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesSeeder } from './profiles.seeder';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesSeeder],
  exports: [ProfilesService],
})
export class ProfilesModule {}
