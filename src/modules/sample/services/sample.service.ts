import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Sample } from '@/entities/';
import { CreateSampleDto, QuerySampleDto, UpdateSampleDto } from '../dtos/sample.dto';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private sampleRepository: Repository<Sample>,
  ) {}

  async findAll(queryParams?: QuerySampleDto): Promise<Sample[]> {
    return this.sampleRepository.find({ ...queryParams });
  }

  async findOne(id: number): Promise<Sample | null> {
    return this.sampleRepository.findOneBy({ id });
  }

  async create(createSampleDto: CreateSampleDto): Promise<Sample | null> {
    return this.sampleRepository.create(createSampleDto);
  }

  async update(updateSampleDto: UpdateSampleDto): Promise<UpdateResult | null> {
    return this.sampleRepository.update(updateSampleDto.id, updateSampleDto);
  }

  async remove(id: number): Promise<void> {
    await this.sampleRepository.delete(id);
  }
}
