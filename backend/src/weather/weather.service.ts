import { Injectable } from '@nestjs/common';

interface BMKGWeatherResponse {
  Datetime: string;
  Operator: string;
  Hu: string;
  RealFeel: string;
  Tmax: string;
  Tmin: string;
  T: string;
  WS: string;
  WD: string;
  Weather: string;
  VisibilityValue: string;
  VisibilityUnit: string;
  Tekanan: string;
  ss: string;
  x_Loc_Lat: string;
  x_Loc_Lon: string;
}

export interface ProcessedWeatherData {
  datetime: string;
  temperature: number;
  temperatureMax: number;
  temperatureMin: number;
  temperatureFeels: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  weather: string;
  pressure: number;
  visibility: number;
  sunDuration: number;
  latitude: number;
  longitude: number;
  operator: string;
}

@Injectable()
export class WeatherService {
  /**
   * Fetch cuaca dari BMKG
   * @param province Nama provinsi (URL encoded)
   * @param district Nama kabupaten/kota (URL encoded)
   */
  async getWeatherFromBMKG(
    province: string,
    district: string,
  ): Promise<ProcessedWeatherData> {
    const url = `https://data.bmkg.go.id/DataMKG/MEWS/LatestDetailed/${encodeURIComponent(province)}/${encodeURIComponent(district)}.json`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(
          `BMKG API error: ${response.status} ${response.statusText}`,
        );
      }

      const data: BMKGWeatherResponse = await response.json();
      return this.processBMKGData(data);
    } catch (error) {
      throw new Error(`Failed to fetch weather from BMKG: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Process raw BMKG data menjadi format yang lebih mudah
   */
  private processBMKGData(data: BMKGWeatherResponse): ProcessedWeatherData {
    return {
      datetime: data.Datetime,
      temperature: parseFloat(data.T),
      temperatureMax: parseFloat(data.Tmax),
      temperatureMin: parseFloat(data.Tmin),
      temperatureFeels: parseFloat(data.RealFeel),
      humidity: parseFloat(data.Hu),
      windSpeed: parseFloat(data.WS),
      windDirection: parseFloat(data.WD),
      weather: data.Weather,
      pressure: parseFloat(data.Tekanan),
      visibility: parseFloat(data.VisibilityValue),
      sunDuration: parseFloat(data.ss),
      latitude: parseFloat(data.x_Loc_Lat),
      longitude: parseFloat(data.x_Loc_Lon),
      operator: data.Operator,
    };
  }

  /**
   * Contoh data dummy (untuk testing tanpa API)
   */
  getMockWeatherData(): ProcessedWeatherData {
    return {
      datetime: new Date().toISOString(),
      temperature: 30,
      temperatureMax: 34,
      temperatureMin: 24,
      temperatureFeels: 32,
      humidity: 80,
      windSpeed: 3,
      windDirection: 270,
      weather: 'Hujan Sedang',
      pressure: 1010,
      visibility: 10,
      sunDuration: 2,
      latitude: -6.2087,
      longitude: 106.8456,
      operator: 'BMKGBogor',
    };
  }
}
