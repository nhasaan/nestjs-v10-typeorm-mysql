import { IsArray, IsBoolean, IsOptional } from 'class-validator';
import { ErrorMessage } from '../dtos/error-message';

export interface ICommandResponse<T> {
  success: boolean;
  data?: T | null;
  errors?: ErrorMessage[];
}

export class CommandResponse<T> implements ICommandResponse<T> {
  @IsBoolean()
  success: boolean;

  @IsOptional()
  data?: T | null;

  @IsOptional()
  @IsArray()
  errors?: ErrorMessage[];

  constructor(model?: CommandResponse<T>) {
    this.success = model?.success || true;
    this.data = model?.data || null;
    this.errors = model?.errors || [];
  }
}
