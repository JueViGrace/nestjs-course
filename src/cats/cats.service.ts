import { Breed } from './../breeds/entities/breed.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedRepository.findOneBy({
      name: createCatDto.breed,
    });

    if (!breed) {
      throw new BadRequestException('Breed not found');
    }

    return await this.catsRepository.save({
      ...createCatDto,
      breed,
    });
  }

  async findAll() {
    return await this.catsRepository.find();
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return; //await this.catsRepository.update(id, updateCatDto);
  }

  async remove(id: number) {
    return await this.catsRepository.softDelete(id);
  }
}
