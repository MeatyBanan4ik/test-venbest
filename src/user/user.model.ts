import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobModel } from '../job/job.model';

@Entity({ name: 'users' })
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  rate: number;

  @OneToMany(() => JobModel, (job) => job.user)
  jobs: JobModel[];
}
