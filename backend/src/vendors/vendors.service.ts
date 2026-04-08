import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';

export interface CreateVendorDto {
  companyName: string;
  businessAddress: string;
  contactPhone: string;
  email: string;
  numberOfCars: number;
  numberOfDrivers: number;
}

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}


  async findAll(): Promise<Vendor[]> {
    return this.vendorRepository.find();
  }

  async findOne(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOneBy({ id });
    if (!vendor) throw new NotFoundException(`Vendor ${id} not found`);
    return vendor;
  }

  async create(dto: CreateVendorDto): Promise<Vendor> {
    const vendor = this.vendorRepository.create({
      companyName: dto.companyName,
      businessAddress: dto.businessAddress,
      contactPhone: dto.contactPhone,
      email: dto.email,
      totalCars: Number(dto.numberOfCars),
      totalDrivers: Number(dto.numberOfDrivers),
      complianceStatus: 'pending',
      complianceIssues: [],
      isActive: false,
    });
    return this.vendorRepository.save(vendor);
  }

  async update(id: string, updates: Partial<Vendor>): Promise<Vendor> {
    await this.vendorRepository.update(id, updates);
    return this.findOne(id);
  }
}
