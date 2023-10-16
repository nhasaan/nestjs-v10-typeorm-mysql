import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SortDirection } from '../enums/sort-direction.enum';

export class Sort {
  @IsNotEmpty()
  @IsString()
  property = 'created_at';

  @IsNotEmpty()
  @IsNumber()
  direction: SortDirection = SortDirection.DESC;
}
