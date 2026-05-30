import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService, ProcessedWeatherData } from './weather.service';

@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  /**
   * GET /api/weather
   * Query params:
   *  - province: Nama provinsi (contoh: "DKI Jakarta")
   *  - district: Nama kabupaten/kota (contoh: "JAKARTA PUSAT")
   */
  @Get()
  async getWeather(
    @Query('province') province: string = 'DKI Jakarta',
    @Query('district') district: string = 'JAKARTA PUSAT',
  ): Promise<ProcessedWeatherData> {
    try {
      return await this.weatherService.getWeatherFromBMKG(province, district);
    } catch (error) {
      // Fallback ke mock data jika API BMKG down
      console.error('BMKG API error:', error instanceof Error ? error.message : 'Unknown error');
      return this.weatherService.getMockWeatherData();
    }
  }

  /**
   * GET /api/weather/mock
   * Endpoint untuk testing tanpa API BMKG
   */
  @Get('mock')
  getMockWeather(): ProcessedWeatherData {
    return this.weatherService.getMockWeatherData();
  }
}
