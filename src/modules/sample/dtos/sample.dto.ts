import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { Pagination } from '@common/dtos';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseSampleDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isActive: boolean;
}

export class CreateSampleDto extends BaseSampleDto {}

export class UpdateSampleDto extends PartialType(CreateSampleDto) {
  @IsOptional()
  @IsNumber()
  id?: number;
}

export class FilterSampleDto extends IntersectionType(Pagination, CreateSampleDto) {}

export class QuerySampleDto extends FilterSampleDto {}
