import { ApiProperty } from '@nestjs/swagger';

export class ListTasksSchema {
  @ApiProperty({ example: 1, description: 'task id' })
  readonly id: number;

  @ApiProperty({ example: 1, description: 'task cost' })
  readonly cost: number;

  @ApiProperty({
    example: '2024-02-02T12:00:00.000Z',
    description: 'task start time',
  })
  readonly start_time: Date;

  @ApiProperty({
    example: '2024-02-02T14:00:00.000Z',
    description: 'task end time',
  })
  readonly end_time: Date;

  @ApiProperty({ example: 1, description: 'task estimate cost' })
  readonly estimate_cost: number;
}
