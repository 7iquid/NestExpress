import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  const usersService = { findOne: jest.fn() };
  const jwtService = { sign: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('returns the user without password when credentials match', async () => {
      usersService.findOne.mockResolvedValue({
        id: 1,
        username: 'tavie',
        password: 'password',
      });

      await expect(service.validateUser('tavie', 'password')).resolves.toEqual({
        id: 1,
        username: 'tavie',
      });
    });

    it('returns null when the password is wrong', async () => {
      usersService.findOne.mockResolvedValue({
        id: 1,
        username: 'tavie',
        password: 'password',
      });

      await expect(service.validateUser('tavie', 'wrong')).resolves.toBeNull();
    });

    it('returns null when the user does not exist', async () => {
      usersService.findOne.mockResolvedValue(undefined);

      await expect(service.validateUser('nobody', 'x')).resolves.toBeNull();
    });
  });

  describe('login', () => {
    it('signs a JWT with username and user id as sub', async () => {
      jwtService.sign.mockReturnValue('signed-token');

      await expect(
        service.login({ id: 1, username: 'tavie' }),
      ).resolves.toEqual({ access_token: 'signed-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'tavie',
        sub: 1,
      });
    });
  });
});
