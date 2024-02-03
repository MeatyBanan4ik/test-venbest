import { DataSource } from 'typeorm';

import { TaskModel } from './task.model';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TaskModel),
    inject: ['DATA_SOURCE'],
  },
];
