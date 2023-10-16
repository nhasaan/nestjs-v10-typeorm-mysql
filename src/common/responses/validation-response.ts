import { IsArray, IsBoolean } from 'class-validator';
import { ErrorMessage } from '../dtos/error-message';

export interface IValidation {
  isValid: boolean;
  errors?: ErrorMessage[];
}

export class Validation implements IValidation {
  @IsBoolean()
  isValid: boolean;

  @IsArray()
  errors?: ErrorMessage[];

  constructor(data?: IValidation) {
    this.isValid = data?.isValid || true;
    this.errors = data?.errors || [];
  }
}
