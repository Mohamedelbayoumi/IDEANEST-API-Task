import { Injectable, ConflictException } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { BcryptjsService } from '../bcryptjs/bcryptjs.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcryptjsService: BcryptjsService,
  ) {}

  async signup(name: string, email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (user) {
      throw new ConflictException('User Already existed');
    }

    const hashedPassword = await this.bcryptjsService.hashPassword(password);

    await this.usersService.create(name, email, hashedPassword);
  }
}
