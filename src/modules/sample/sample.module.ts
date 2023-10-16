import { Module } from '@nestjs/common';
import { SampleService } from './services/sample.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sample } from '@/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  providers: [SampleService],
  exports: [SampleService],
})
export class SampleModule {}
