import { DataSource } from 'typeorm';
import { UserModel } from './user.model';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserModel),
    inject: ['DATA_SOURCE'],
  },
];