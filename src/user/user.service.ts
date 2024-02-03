import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<UserModel>,
  ) {}

  async getById(id: number) {
    return this.repository.findOne({ where: { id } });
  }
}
