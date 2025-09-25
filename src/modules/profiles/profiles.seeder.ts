import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesSeeder {
  private readonly logger = new Logger(ProfilesSeeder.name);
  private readonly collection: admin.firestore.CollectionReference<Profile>;

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.collection = this.firebaseAdmin
      .firestore()
      .collection('profiles') as admin.firestore.CollectionReference<Profile>;
  }

  private readonly seedProfiles: Omit<
    Profile,
    'id' | 'createdAt' | 'updatedAt'
  >[] = [
    {
      username: 'traveler1',
      email: 'traveler1@example.com',
      bio: 'Loves hiking and mountains',
      interests: ['hiking', 'nature'],
      location: 'Manila, Philippines',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
    {
      username: 'foodie123',
      email: 'foodie@example.com',
      bio: 'Exploring cuisines worldwide',
      interests: ['food trips', 'travel'],
      location: 'Bangkok, Thailand',
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
    },
    {
      username: 'adventurerX',
      email: 'adventurer@example.com',
      bio: 'Adrenaline junkie',
      interests: ['skydiving', 'scuba diving'],
      location: 'Sydney, Australia',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
    // Add the 10 additional profiles here
    {
      username: 'adventurer1',
      email: 'adventurer1@example.com',
      bio: 'Always seeking new adventures',
      interests: ['hiking', 'skydiving', 'camping'],
      location: 'Denver, USA',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    {
      username: 'foodie2',
      email: 'foodie2@example.com',
      bio: 'Exploring the world one meal at a time',
      interests: ['food trips', 'cooking'],
      location: 'Bangkok, Thailand',
      avatarUrl: 'https://i.pravatar.cc/150?img=6',
    },
    {
      username: 'traveler3',
      email: 'traveler3@example.com',
      bio: 'Traveling is my therapy',
      interests: ['beaches', 'museums', 'photography'],
      location: 'Lisbon, Portugal',
      avatarUrl: 'https://i.pravatar.cc/150?img=7',
    },
    {
      username: 'mountainlover4',
      email: 'mountainlover4@example.com',
      bio: 'Mountains are my happy place',
      interests: ['hiking', 'skiing'],
      location: 'Chamonix, France',
      avatarUrl: 'https://i.pravatar.cc/150?img=8',
    },
    {
      username: 'cultureseeker5',
      email: 'cultureseeker5@example.com',
      bio: 'Loves museums and history',
      interests: ['museums', 'architecture', 'art'],
      location: 'Rome, Italy',
      avatarUrl: 'https://i.pravatar.cc/150?img=9',
    },
    {
      username: 'beachbum6',
      email: 'beachbum6@example.com',
      bio: 'Sun, sand, and sea',
      interests: ['surfing', 'swimming', 'snorkeling'],
      location: 'Bali, Indonesia',
      avatarUrl: 'https://i.pravatar.cc/150?img=10',
    },
    {
      username: 'photog7',
      email: 'photog7@example.com',
      bio: 'Capturing moments around the world',
      interests: ['photography', 'travel', 'hiking'],
      location: 'Tokyo, Japan',
      avatarUrl: 'https://i.pravatar.cc/150?img=11',
    },
    {
      username: 'cyclist8',
      email: 'cyclist8@example.com',
      bio: 'Biking is life',
      interests: ['cycling', 'mountains', 'nature'],
      location: 'Amsterdam, Netherlands',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
    },
    {
      username: 'adrenaline9',
      email: 'adrenaline9@example.com',
      bio: 'Thrill-seeker and adrenaline junkie',
      interests: ['skydiving', 'scuba diving', 'paragliding'],
      location: 'Queenstown, New Zealand',
      avatarUrl: 'https://i.pravatar.cc/150?img=13',
    },
    {
      username: 'naturelover10',
      email: 'naturelover10@example.com',
      bio: 'Nature heals the soul',
      interests: ['hiking', 'birdwatching', 'camping'],
      location: 'Vancouver, Canada',
      avatarUrl: 'https://i.pravatar.cc/150?img=14',
    },
  ];

  async seed() {
    this.logger.log('Seeding profiles to Firestore...');
    for (const p of this.seedProfiles) {
      const snapshot = await this.collection
        .where('username', '==', p.username)
        .get();
      if (snapshot.empty) {
        const now = new Date();
        const profile: Profile = {
          id: this.collection.doc().id,
          ...p,
          createdAt: now,
          updatedAt: now,
        };
        await this.collection.doc(profile.id).set(profile);
        this.logger.log(`Inserted profile: ${profile.username}`);
      } else {
        this.logger.log(`Profile already exists: ${p.username}`);
      }
    }
    this.logger.log('Seeding completed.');
  }
}
