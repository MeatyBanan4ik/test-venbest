import { Module } from '@nestjs/common';

import { TaskService } from './task.service';
import { taskProviders } from './task.provider';
import { TaskController } from './task.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [TaskController],
  providers: [...taskProviders, TaskService],
  imports: [DatabaseModule],
  exports: [TaskService],
})
export class TaskModule {}
