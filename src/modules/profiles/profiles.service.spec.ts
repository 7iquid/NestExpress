import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';

describe('ProfilesService', () => {
  let service: ProfilesService;

  // Fake Firestore: firebaseAdmin.firestore().collection('profiles') -> collection
  const docRef = { id: 'new-id', get: jest.fn(), set: jest.fn() };
  const collection = {
    where: jest.fn(),
    get: jest.fn(),
    doc: jest.fn(),
  };
  const firebaseAdmin = {
    firestore: () => ({ collection: () => collection }),
  };

  const createDto: CreateProfileDto = {
    username: 'tavie',
    email: 'tavie@example.com',
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    collection.doc.mockReturnValue(docRef);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        { provide: 'FIREBASE_ADMIN', useValue: firebaseAdmin },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('saves and returns a new profile when the username is free', async () => {
      collection.where.mockReturnValue({
        get: jest.fn().mockResolvedValue({ empty: true }),
      });

      const result = await service.create(createDto);

      expect(result).toMatchObject({ id: 'new-id', username: 'tavie' });
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(docRef.set).toHaveBeenCalledWith(result);
    });

    it('throws BadRequestException when the username is taken', async () => {
      collection.where.mockReturnValue({
        get: jest.fn().mockResolvedValue({ empty: false }),
      });

      await expect(service.create(createDto)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(docRef.set).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('returns the profile with its id', async () => {
      docRef.get.mockResolvedValue({
        exists: true,
        id: 'abc',
        data: () => ({ username: 'tavie' }),
      });

      await expect(service.findOne('abc')).resolves.toEqual({
        id: 'abc',
        username: 'tavie',
      });
      expect(collection.doc).toHaveBeenCalledWith('abc');
    });

    it('throws NotFoundException when the profile does not exist', async () => {
      docRef.get.mockResolvedValue({ exists: false });

      await expect(service.findOne('missing')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('merges the dto into the existing profile', async () => {
      docRef.get.mockResolvedValue({
        exists: true,
        data: () => ({ username: 'old', bio: 'hi' }),
      });

      const result = await service.update('abc', { username: 'new' });

      expect(result).toMatchObject({
        id: 'new-id',
        username: 'new',
        bio: 'hi',
      });
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(docRef.set).toHaveBeenCalledWith(result, { merge: true });
    });

    it('throws NotFoundException when the profile does not exist', async () => {
      docRef.get.mockResolvedValue({ exists: false });

      await expect(service.update('missing', {})).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(docRef.set).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('maps every document to a profile with its id', async () => {
      collection.get.mockResolvedValue({
        docs: [
          { id: 'a', data: () => ({ username: 'one' }) },
          { id: 'b', data: () => ({ username: 'two' }) },
        ],
      });

      await expect(service.findAll()).resolves.toEqual([
        { id: 'a', username: 'one' },
        { id: 'b', username: 'two' },
      ]);
    });
  });
});
