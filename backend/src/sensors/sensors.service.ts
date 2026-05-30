import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SensorsService {
  constructor(private readonly prisma: PrismaService) {}

  getHourlyReadings() {
    return this.prisma.sensorReading.findMany({
      orderBy: { timeLabel: 'asc' },
    });
  }

  getYieldForecast() {
    return this.prisma.yieldForecast.findMany({
      orderBy: { day: 'asc' },
    });
  }

  getWeatherForecast() {
    return this.prisma.weatherForecast.findMany({
      orderBy: { day: 'asc' },
    });
  }
}
