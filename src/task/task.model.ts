import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { JobModel } from '../job/job.model';

@Entity({ name: 'tasks' })
export class TaskModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  cost: number;

  @Column({ nullable: false })
  startTime: Date;

  @Column({ nullable: false })
  endTime: Date;

  @OneToMany(() => JobModel, (job) => job.task)
  jobs: JobModel[];
}
