import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDimensionDto } from '../dto/crud-dimension.dto';
import { Dimension } from '../entities/dimension.entity';

@Injectable()
export class DimensionService {
  constructor(
    @InjectRepository(Dimension)
    public readonly dimensionRepository: Repository<Dimension>
  ) {}

  async insertOne(digestId: number, dimension: CreateDimensionDto) {
    const dimensionInstance = this.dimensionRepository.create({
      digestId,
      name: dimension.name,
      type: dimension.type,
      content: dimension.content,
    });

    await this.dimensionRepository.insert(dimensionInstance);
  }

  async findOne(digestId: number) {
    return this.dimensionRepository.findOne({
      where: { id: digestId },
    });
  }
}
