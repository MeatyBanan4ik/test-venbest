import { Body, Controller, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JobModel } from './job.model';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private service: JobService) {}

  @ApiOperation({ summary: 'create job' })
  @ApiOkResponse({ type: JobModel })
  @Post()
  create(@Body() dto: CreateJobDto) {
    return this.service.create(dto);
  }
}
