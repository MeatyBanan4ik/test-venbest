import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TaskService } from './task.service';
import { EstimateCostFilterDto } from './dto/list-tasks.dto';
import { ListTasksSchema } from './schema/list-tasks.schema';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private service: TaskService) {}

  @ApiOperation({ summary: 'get tasks list' })
  @ApiOkResponse({ type: ListTasksSchema })
  @Get()
  list(@Query('filters') dto: EstimateCostFilterDto) {
    return this.service.list(dto);
  }
}
