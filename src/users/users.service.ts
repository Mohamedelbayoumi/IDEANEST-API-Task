import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(name: string, email: string, password: string) {
    await this.userModel.create({
      name,
      email,
      password,
    });
  }

  async findUserByEmail(email: string) {
    return await this.userModel
      .findOne({ email })
      .select('name email password');
  }
}
