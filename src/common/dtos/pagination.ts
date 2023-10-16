import { IsOptional, IsPositive, Max, Min } from 'class-validator';

export class Pagination {
  @IsOptional()
  @Min(1)
  @IsPositive()
  skip?: number = 1;

  @IsOptional()
  @IsPositive()
  @Max(100)
  take?: number = 100;
}
