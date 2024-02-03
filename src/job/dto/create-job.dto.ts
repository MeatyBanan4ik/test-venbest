import { IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    example: 1,
    description: 'Job task ID',
  })
  @IsNumber()
  readonly taskId: number;

  @ApiProperty({
    example: 1,
    description: 'Job user ID',
  })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({
    example: '2024-02-02 12:00:00',
    description: 'Job start time',
  })
  @IsDateString()
  readonly startTime: Date;

  @ApiProperty({ example: '2024-02-02 14:00:00', description: 'Job end time' })
  @IsDateString()
  readonly endTime: Date;
}
