import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = app.get(ConfigService);

  const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKey: configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        ?.replace(/\\n/g, '\n'),
      clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    }),
  });

  const firestore = firebaseApp.firestore();

  const profiles = [
    {
      username: 'test Name',
      email: 'test@example.com',
      bio: 'I love traveling and food adventures',
      interests: ['hiking', 'food trips', 'photography'],
      location: 'Manila, Philippines',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Alice Wanderlust',
      email: 'alice@example.com',
      bio: 'Explorer of hidden gems.',
      interests: ['backpacking', 'yoga', 'surfing'],
      location: 'Cebu, Philippines',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Marco Polo',
      email: 'marco@example.com',
      bio: 'Adventure seeker and history buff.',
      interests: ['culture', 'museums', 'cycling'],
      location: 'Venice, Italy',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Sophia Sun',
      email: 'sophia@example.com',
      bio: 'Chasing sunsets and good food.',
      interests: ['photography', 'foodie', 'beaches'],
      location: 'Bali, Indonesia',
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Kenji Traveler',
      email: 'kenji@example.com',
      bio: 'Mountains are my second home.',
      interests: ['mountaineering', 'anime', 'ramen hunting'],
      location: 'Tokyo, Japan',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Lara Nomad',
      email: 'lara@example.com',
      bio: 'Always ready for the next flight.',
      interests: ['solo travel', 'journaling', 'volunteering'],
      location: 'Berlin, Germany',
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Diego Camino',
      email: 'diego@example.com',
      bio: 'Lover of trails and old towns.',
      interests: ['hiking', 'history', 'local food'],
      location: 'Madrid, Spain',
      avatarUrl: 'https://i.pravatar.cc/150?img=7',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Emma Globe',
      email: 'emma@example.com',
      bio: 'Digital nomad exploring cowork spaces.',
      interests: ['coding', 'writing', 'coffee shops'],
      location: 'Lisbon, Portugal',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Rajesh Explorer',
      email: 'rajesh@example.com',
      bio: 'Passionate about cultures and spirituality.',
      interests: ['temples', 'meditation', 'street food'],
      location: 'Varanasi, India',
      avatarUrl: 'https://i.pravatar.cc/150?img=9',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Amelia Sky',
      email: 'amelia@example.com',
      bio: 'Flying high and dreaming big.',
      interests: ['flying', 'adventure sports', 'fashion'],
      location: 'London, UK',
      avatarUrl: 'https://i.pravatar.cc/150?img=10',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Oliver Trek',
      email: 'oliver@example.com',
      bio: 'Chasing peaks and rivers.',
      interests: ['kayaking', 'hiking', 'camping'],
      location: 'Vancouver, Canada',
      avatarUrl: 'https://i.pravatar.cc/150?img=11',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Maya Horizon',
      email: 'maya@example.com',
      bio: 'Lost in books and beaches.',
      interests: ['reading', 'beach walks', 'yoga'],
      location: 'Sydney, Australia',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Jonas Fjord',
      email: 'jonas@example.com',
      bio: 'Lover of cold seas and northern lights.',
      interests: ['skiing', 'northern lights', 'photography'],
      location: 'Oslo, Norway',
      avatarUrl: 'https://i.pravatar.cc/150?img=13',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Fatima Desert',
      email: 'fatima@example.com',
      bio: 'Exploring deserts and oases.',
      interests: ['desert camping', 'tea rituals', 'camel rides'],
      location: 'Marrakech, Morocco',
      avatarUrl: 'https://i.pravatar.cc/150?img=14',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Lucas Ocean',
      email: 'lucas@example.com',
      bio: 'Diving deep into blue worlds.',
      interests: ['scuba diving', 'marine life', 'conservation'],
      location: 'Cape Town, South Africa',
      avatarUrl: 'https://i.pravatar.cc/150?img=15',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Sofia Andes',
      email: 'sofia@example.com',
      bio: 'Hiking the trails of South America.',
      interests: ['mountains', 'nature', 'local cuisine'],
      location: 'Cusco, Peru',
      avatarUrl: 'https://i.pravatar.cc/150?img=16',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Daniel Safari',
      email: 'daniel@example.com',
      bio: 'Wildlife enthusiast and storyteller.',
      interests: ['safaris', 'documentaries', 'photography'],
      location: 'Nairobi, Kenya',
      avatarUrl: 'https://i.pravatar.cc/150?img=17',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Elena Riviera',
      email: 'elena@example.com',
      bio: 'Lover of coasts and culinary journeys.',
      interests: ['cooking', 'beaches', 'wine tasting'],
      location: 'Nice, France',
      avatarUrl: 'https://i.pravatar.cc/150?img=18',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Tommy Outback',
      email: 'tommy@example.com',
      bio: 'Explorer of the wild lands.',
      interests: ['camping', 'off-road driving', 'wildlife'],
      location: 'Darwin, Australia',
      avatarUrl: 'https://i.pravatar.cc/150?img=19',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Isabella Lagoon',
      email: 'isabella@example.com',
      bio: 'Finding peace in lagoons.',
      interests: ['kayaking', 'reading', 'island hopping'],
      location: 'Palawan, Philippines',
      avatarUrl: 'https://i.pravatar.cc/150?img=20',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const batch = firestore.batch();
  const collectionRef = firestore.collection('profiles');

  profiles.forEach((profile) => {
    const docRef = collectionRef.doc();
    batch.set(docRef, profile);
  });

  await batch.commit();
  console.log(`✅ Seeded ${profiles.length} profiles`);
  await app.close();
}

bootstrap();
