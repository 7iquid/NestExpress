import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileResponseDto } from './dto/response-profile.dto';

describe('ProfilesController', () => {
  let controller: ProfilesController;
  const profilesService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  };
  const profile: ProfileResponseDto = {
    id: 'abc',
    username: 'tavie',
    email: 'tavie@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [{ provide: ProfilesService, useValue: profilesService }],
    }).compile();

    controller = module.get<ProfilesController>(ProfilesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create wraps the new profile with status 201', async () => {
    const dto: CreateProfileDto = {
      username: 'tavie',
      email: 'tavie@example.com',
    };
    profilesService.create.mockResolvedValue(profile);

    await expect(controller.create(dto)).resolves.toEqual({
      statusCode: 201,
      data: profile,
    });
    expect(profilesService.create).toHaveBeenCalledWith(dto);
  });

  it('findOne wraps the profile with status 200', async () => {
    profilesService.findOne.mockResolvedValue(profile);

    await expect(controller.findOne('abc')).resolves.toEqual({
      statusCode: 200,
      data: profile,
    });
    expect(profilesService.findOne).toHaveBeenCalledWith('abc');
  });

  it('update passes id and dto to the service', async () => {
    const dto: UpdateProfileDto = { username: 'new' };
    profilesService.update.mockResolvedValue({ ...profile, ...dto });

    await expect(controller.update('abc', dto)).resolves.toEqual({
      statusCode: 200,
      data: { ...profile, ...dto },
    });
    expect(profilesService.update).toHaveBeenCalledWith('abc', dto);
  });

  it('findAll wraps the list with status 200', async () => {
    profilesService.findAll.mockResolvedValue([profile]);

    await expect(controller.findAll()).resolves.toEqual({
      statusCode: 200,
      data: [profile],
    });
  });
});
