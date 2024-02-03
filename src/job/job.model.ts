import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserModel } from '../user/user.model';
import { TaskModel } from '../task/task.model';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'jobs' })
export class JobModel extends BaseEntity {
  @ApiProperty({ example: 1, description: 'job id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'task id' })
  @Column({ nullable: false })
  taskId: number;

  @ApiProperty({ example: 1, description: 'user id' })
  @Column({ nullable: false })
  userId: number;

  @ApiProperty({
    example: '2024-02-02 20:00:00',
    description: 'start datetime',
  })
  @Column({ nullable: false })
  startTime: Date;

  @ApiProperty({
    example: '2024-02-02 21:16:00',
    description: 'end datetime',
  })
  @Column({ nullable: false })
  endTime: Date;

  @ApiProperty({
    example: '2',
    description: 'full hours for job',
  })
  @Column({ default: 0 })
  fullHours: number;

  @ManyToOne(() => UserModel, (user) => user.jobs)
  user: UserModel;

  @ManyToOne(() => TaskModel, (task) => task.jobs)
  task: TaskModel;
}
