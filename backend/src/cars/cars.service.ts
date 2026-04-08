import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}


  async findAllByVendor(vendorId: string): Promise<Car[]> {
    return this.carRepository.find({ where: { vendorId } });
  }

  async create(dto: Partial<Car>, vendorId: string): Promise<Car> {
    const car = this.carRepository.create({ ...dto, vendorId });
    return this.carRepository.save(car);
  }
}
