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
        const app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: config.get<string>('FIREBASE_PROJECT_ID'),
            privateKey: config
              .get<string>('FIREBASE_PRIVATE_KEY')
              ?.replace(/\\n/g, '\n'),
            clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
          }),
          databaseURL: `https://${config.get<string>('FIREBASE_PROJECT_ID')}.firebaseio.com`,
        });
        app.firestore().settings({ ignoreUndefinedProperties: true });
        return app;
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
