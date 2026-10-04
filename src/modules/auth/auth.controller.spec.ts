import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = { login: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login passes the guard-validated user to AuthService', async () => {
    const user = { id: 1, username: 'tavie' };
    authService.login.mockResolvedValue({ access_token: 'token' });

    await expect(controller.login({ user })).resolves.toEqual({
      access_token: 'token',
    });
    expect(authService.login).toHaveBeenCalledWith(user);
  });
});
