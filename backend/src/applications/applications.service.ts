import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendorApplication } from './entities/application.entity';

export interface CreateApplicationDto {
  businessName: string;
  numberOfCars: number;
  numberOfVehicles: number;
  email: string;
  phone: string;
}

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(VendorApplication)
    private readonly applicationRepository: Repository<VendorApplication>,
  ) {}


  async findAll(): Promise<VendorApplication[]> {
    return this.applicationRepository.find();
  }

  async findOne(id: string): Promise<VendorApplication> {
    const app = await this.applicationRepository.findOneBy({ id: id as any });
    if (!app) throw new NotFoundException(`Application ${id} not found`);
    return app;
  }

  async create(dto: CreateApplicationDto): Promise<VendorApplication> {
    const app = this.applicationRepository.create({
      ...dto,
      numberOfCars: Number(dto.numberOfCars),
      numberOfVehicles: Number(dto.numberOfVehicles),
      status: 'NEW',
    });
    return this.applicationRepository.save(app);
  }

  async update(id: string, updates: Partial<VendorApplication>): Promise<VendorApplication> {
    await this.applicationRepository.update(id, updates);
    return this.findOne(id);
  }
}
