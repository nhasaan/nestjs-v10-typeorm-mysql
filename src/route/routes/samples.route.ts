import { Controller, Get, Param, Post, Body, Put, Query } from '@nestjs/common';
import { CreateSampleDto, QuerySampleDto, UpdateSampleDto } from '@modules/sample/dtos/sample.dto';
import { SampleService } from '@/modules/sample/services/sample.service';

@Controller('samples')
export class SamplesRoute {
  constructor(private sampleService: SampleService) {}

  @Get()
  async findAll(@Query() queryParams: QuerySampleDto) {
    return this.sampleService.findAll(queryParams);
  }

  @Get(':id')
  async findById(@Param('id') id: any) {
    return this.sampleService.findOne(id);
  }

  @Post()
  createSample(@Body() sampleCreateDto: CreateSampleDto) {
    return this.sampleService.create(sampleCreateDto);
  }

  @Put(':id')
  updateSample(@Param('id') sampleId: number, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.update({ id: sampleId, ...updateSampleDto });
  }
}
