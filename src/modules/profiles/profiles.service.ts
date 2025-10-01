import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/response-profile.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class ProfilesService {
  private readonly collection: admin.firestore.CollectionReference<ProfileResponseDto>;
  private readonly logger = new Logger(ProfilesService.name);

  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {
    this.collection = this.firebaseAdmin
      .firestore()
      .collection(
        'profiles',
      ) as admin.firestore.CollectionReference<ProfileResponseDto>;
  }

  async create(dto: CreateProfileDto): Promise<ProfileResponseDto> {
    this.logger.log(`Creating profile for username: ${dto.username}`);

    const snapshot = await this.collection
      .where('username', '==', dto.username)
      .get();
    if (!snapshot.empty) {
      this.logger.warn(`Username ${dto.username} already exists`);
      throw new BadRequestException('Username already exists');
    }

    const now = new Date();
    const profile: ProfileResponseDto = {
      id: this.collection.doc().id,
      ...dto,
      createdAt: now,
      updatedAt: now,
    };

    await this.collection.doc(profile.id).set(profile);
    this.logger.log(`Profile created with ID: ${profile.id}`);

    return profile;
  }

  async findOne(id: string): Promise<ProfileResponseDto> {
    this.logger.log(`Fetching profile with ID: ${id}`);
    const doc = await this.collection.doc(id).get();

    if (!doc.exists) {
      this.logger.warn(`Profile with ID ${id} not found`);
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    return { ...doc.data()!, id: doc.id };
  }

  async update(id: string, dto: UpdateProfileDto): Promise<ProfileResponseDto> {
    this.logger.log(`Updating profile with ID: ${id}`);
    const docRef = this.collection.doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      this.logger.warn(`Profile with ID ${id} not found`);
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    const updated: ProfileResponseDto = {
      ...docSnap.data()!,
      ...dto,
      id: docRef.id,
      updatedAt: new Date(),
    };

    await docRef.set(updated, { merge: true });
    this.logger.log(`Profile with ID ${id} updated`);

    return updated;
  }

  async findAll(): Promise<ProfileResponseDto[]> {
    this.logger.log('Fetching all profiles');

    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
}
