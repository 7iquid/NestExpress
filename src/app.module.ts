import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgenciesModule } from './agencies/agencies.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    // ✅ Global config for .env variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ Global cache
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 1000, // 1 minute
    }),

    // ✅ Rate limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60,
        },
      ],
    }),

    // ✅ Firebase Admin SDK module
    FirebaseModule,

    // ✅ Your feature modules
    AgenciesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
