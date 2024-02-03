import { Module } from '@nestjs/common';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskModule } from './task/task.module';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TaskModule,
    JobModule,
    UserModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
