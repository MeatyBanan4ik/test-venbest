import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { JobModel } from './job.model';
import { CreateJobDto } from './dto/create-job.dto';
import { TaskService } from '../task/task.service';
import { UserService } from '../user/user.service';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const HOUR_IN_MS = 60 * 60 * 1000;
const MINUTE_IN_MS = 60 * 1000;

@Injectable()
export class JobService {
  constructor(
    @Inject('JOB_REPOSITORY')
    private repository: Repository<JobModel>,
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  async create(dto: CreateJobDto) {
    const task = await this.taskService.getById(dto.taskId);
    const user = await this.userService.getById(dto.userId);

    if (!task || !user) {
      throw new BadRequestException('invalid task or user id');
    }

    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);

    if (startTime >= endTime) {
      throw new BadRequestException('endTime must be greater than startTime');
    }

    if (startTime < task.startTime || endTime > task.endTime) {
      throw new BadRequestException('incorrect dates');
    }

    const fullHours = this.getFullHours(startTime, endTime);
    const thisJobCost = fullHours * user.rate;

    const estimateCost = await this.taskService.getEstimateCost(task.id);

    if (estimateCost < thisJobCost) {
      return new BadRequestException('exceeding the limit of funds for a task');
    }

    return this.save(dto);
  }

  private getFullHours(
    startTime: string | Date | number,
    endTime: string | Date | number,
  ): number {
    const diff = new Date(endTime).getTime() - new Date(startTime).getTime();

    const hours = Math.floor((diff % DAY_IN_MS) / HOUR_IN_MS);
    const minutes = Math.round(
      ((diff % DAY_IN_MS) % HOUR_IN_MS) / MINUTE_IN_MS,
    );

    return minutes > 15 ? hours + 1 : hours;
  }

  private save(dto: CreateJobDto) {
    const job = new JobModel();

    job.userId = dto.userId;
    job.taskId = dto.taskId;
    job.startTime = dto.startTime;
    job.endTime = dto.endTime;
    job.fullHours = this.getFullHours(dto.startTime, dto.endTime);

    return this.repository.save(job);
  }
}
