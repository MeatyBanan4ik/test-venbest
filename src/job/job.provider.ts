import { DataSource } from 'typeorm';

import { JobModel } from './job.model';

export const jobProviders = [
  {
    provide: 'JOB_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(JobModel),
    inject: ['DATA_SOURCE'],
  },
];
