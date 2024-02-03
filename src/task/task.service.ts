import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

import { TaskModel } from './task.model';
import { SpentCostFilterDto } from './dto/list-tasks.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private repository: Repository<TaskModel>,
  ) {}

  async list(filtersDto: SpentCostFilterDto) {
    const query = this.repository
      .createQueryBuilder('t')
      .leftJoinAndSelect(
        (subQuery) => {
          return subQuery
            .from('jobs', 'j')
            .leftJoin('users', 'u', 'j.userId = u.id')
            .select('j."taskId"')
            .addSelect('SUM(j."fullHours" * u.rate)::numeric', 'sum_costs')
            .groupBy('j."taskId"');
        },
        'sj',
        'sj."taskId" = t.id',
      )
      .select([
        't.*',
        'Round(((sj.sum_costs / t.cost) * 100), 2) AS "spentCost"',
      ]);

    await this.filters(query, filtersDto);

    const tasks = await query.getRawMany();

    return tasks.map((task) => ({
      id: task.id,
      cost: Number(task.cost),
      start_time: task.startTime,
      end_time: task.endTime,
      spent_cost: `${task.spentCost}%`,
    }));
  }

  async getById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async getEstimateCost(id: number): Promise<number> {
    const query = await this.repository
      .createQueryBuilder('t')
      .leftJoinAndSelect(
        (subQuery) => {
          return subQuery
            .from('jobs', 'j')
            .leftJoin('users', 'u', 'j.userId = u.id')
            .select('j."taskId"')
            .addSelect('SUM(j."fullHours" * u.rate)::numeric', 'sum_costs')
            .groupBy('j."taskId"');
        },
        'sj',
        'sj."taskId" = t.id',
      )
      .select('t.cost - sj.sum_costs', 'estimateCost')
      .where('t.id = :id', { id })
      .getRawOne();

    return Number(query.estimateCost);
  }

  private async filters(query, filters) {
    if ('min' in filters || 'max' in filters) {
      query.where(
        'Round(((sj.sum_costs / t.cost) * 100), 2) BETWEEN :min AND :max',
        {
          min: Number('min' in filters ? filters.min : 0),
          max: Number('max' in filters ? filters.max : 100),
        },
      );
    }
  }
}
