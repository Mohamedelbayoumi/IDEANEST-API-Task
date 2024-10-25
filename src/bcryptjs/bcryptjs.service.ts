import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Injectable()
export class BcryptjsService {
  async hashPassword(password: string) {
    return await hash(password, 12);
  }
}
