import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';

@Controller('cars')
@UseGuards(JwtAuthGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async findAll(@Req() req: any) {
    // Data Isolation: Only fetch cars for the logged-in user's vendor
    const vendorId = req.user.vendorId;
    return this.carsService.findAllByVendor(vendorId);
  }

  @Post()
  async create(@Body() dto: Partial<Car>, @Req() req: any) {
    const vendorId = req.user.vendorId;
    return this.carsService.create(dto, vendorId);
  }
}
