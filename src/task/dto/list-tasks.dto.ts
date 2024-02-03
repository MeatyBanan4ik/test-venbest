import { ApiPropertyOptional } from '@nestjs/swagger';

export class SpentCostFilterDto {
  @ApiPropertyOptional({
    name: 'filters[min]',
    example: 1,
    description: 'minimum percentage for search',
  })
  readonly min?: number;

  @ApiPropertyOptional({
    name: 'filters[max]',
    example: 99,
    description: 'maximum percentage for search',
  })
  readonly max?: number;
}
