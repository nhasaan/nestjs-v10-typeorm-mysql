import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export interface IQueryResponse<T> {
  success: boolean;
  data: T[];
  totalCount?: number;
}

export class QueryResponse<T> implements IQueryResponse<T> {
  @IsBoolean()
  success: boolean;

  @IsArray()
  data: T[];

  @IsOptional()
  @IsNumber()
  totalCount?: number;

  constructor(model?: QueryResponse<T>) {
    this.success = model?.success || true;
    this.data = model?.data || [];
    this.totalCount = model?.totalCount || 0;
  }
}
