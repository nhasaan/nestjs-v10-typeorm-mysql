import { IsString } from 'class-validator';

export interface ErrorMessage {
  message: string;
  code: string;
}

export class ErrorMessage implements ErrorMessage {
  @IsString()
  code: string;

  @IsString()
  message: string;

  constructor(error?: ErrorMessage) {
    this.message = error?.message || '';
    this.code = error?.code || '';
  }
}
