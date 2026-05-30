import { Controller, Get } from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get('hourly')
  hourly() {
    return this.sensorsService.getHourlyReadings();
  }

  @Get('yield')
  yield() {
    return this.sensorsService.getYieldForecast();
  }

  @Get('weather')
  weather() {
    return this.sensorsService.getWeatherForecast();
  }
}
