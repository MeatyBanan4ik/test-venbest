import { Module } from '@nestjs/common';

import { JobService } from './job.service';
import { JobController } from './job.controller';
import { DatabaseModule } from '../database/database.module';
import { jobProviders } from './job.provider';
import { TaskModule } from '../task/task.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [JobController],
  providers: [...jobProviders, JobService],
  imports: [DatabaseModule, TaskModule, UserModule],
})
export class JobModule {}
