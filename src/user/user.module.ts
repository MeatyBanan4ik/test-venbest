import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { userProviders } from './user.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [...userProviders, UserService],
  imports: [DatabaseModule],
  exports: [UserService],
})
export class UserModule {}
