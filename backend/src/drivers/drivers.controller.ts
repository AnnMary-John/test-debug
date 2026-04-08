import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';

@Controller('drivers')
@UseGuards(JwtAuthGuard)
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  async findAll(
    @Req() req: any,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const vendorId = req.user.vendorId;
    return this.driversService.findAllByVendor(
      vendorId,
      search,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }

  @Post()
  async create(@Body() dto: Partial<Driver>, @Req() req: any) {
    const vendorId = req.user.vendorId;
    return this.driversService.create(dto, vendorId);
  }
}
