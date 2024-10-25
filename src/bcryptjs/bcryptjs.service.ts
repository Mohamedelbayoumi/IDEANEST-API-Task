import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class BcryptjsService {
  async hashPassword(password: string) {
    return await hash(password, 12);
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}
