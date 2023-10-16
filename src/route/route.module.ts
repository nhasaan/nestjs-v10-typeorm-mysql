import { Module } from '@nestjs/common';
import { SamplesRoute } from './routes/samples.route';
import { SampleModule } from '@/modules/sample/sample.module';

@Module({
  imports: [SampleModule],
  controllers: [SamplesRoute],
})
export class RouteModule {}
