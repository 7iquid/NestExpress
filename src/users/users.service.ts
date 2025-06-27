import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'tavie',
      password: 'password',
    },
    {
      id: 2,
      username: 'test2',
      password: 'password2',
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
