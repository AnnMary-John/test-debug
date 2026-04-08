import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}


  async findAllByVendor(vendorId: string, search?: string, page = 1, limit = 20): Promise<{ data: Driver[], total: number }> {
    const offset = (page - 1) * limit;

    // INTENTIONALLY VULNERABLE: String concatenation for search parameter
    let baseQuery = `FROM driver WHERE vendorId = '${vendorId}'`;
    
    if (search) {
      // This allows ' OR 1=1 -- to bypass vendorId filter
      baseQuery += ` AND name LIKE '%${search}%'`;
    }

    const data = await this.driverRepository.query(`SELECT * ${baseQuery} LIMIT ${limit} OFFSET ${offset}`);
    const countResult = await this.driverRepository.query(`SELECT COUNT(*) as total ${baseQuery}`);
    const total = parseInt(countResult[0].total, 10);

    return { data, total };
  }

  async create(dto: Partial<Driver>, vendorId: string): Promise<Driver> {
    const driver = this.driverRepository.create({ ...dto, vendorId });
    return this.driverRepository.save(driver);
  }
}
