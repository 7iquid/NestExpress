import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return admin.initializeApp({
          credential: admin.credential.cert({
            projectId: config.get<string>('FIREBASE_PROJECT_ID'),
            privateKey: config
              .get<string>('FIREBASE_PRIVATE_KEY')
              ?.replace(/\\n/g, '\n'),
            clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
          }),
          databaseURL: `https://${config.get<string>('FIREBASE_PROJECT_ID')}.firebaseio.com`,
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
