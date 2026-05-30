// Jika sudah setup backend dengan weather service
// Client bisa akses di: http://localhost:3000/api/weather

export interface WeatherData {
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

/**
 * Fetch cuaca dari backend
 */
export async function fetchWeather(
  province: string = 'DKI Jakarta',
  district: string = 'JAKARTA PUSAT',
): Promise<WeatherData> {
  const response = await fetch(
    `http://localhost:3000/api/weather?province=${encodeURIComponent(province)}&district=${encodeURIComponent(district)}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather');
  }

  return response.json();
}

/**
 * Fetch mock weather (untuk testing)
 */
export async function fetchMockWeather(): Promise<WeatherData> {
  const response = await fetch('http://localhost:3000/api/weather/mock');

  if (!response.ok) {
    throw new Error('Failed to fetch mock weather');
  }

  return response.json();
}

/**
 * Convert arah angin derajat ke text
 */
export function getWindDirectionName(degrees: number): string {
  const directions = [
    'Utara',
    'Utara Timur',
    'Timur',
    'Tenggara',
    'Selatan',
    'Barat Daya',
    'Barat',
    'Barat Laut',
  ];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

/**
 * Interpret kondisi cuaca untuk rekomendasi pertanian
 */
export function getAgriRecommendation(weather: WeatherData): string {
  const temp = weather.temperature;
  const humidity = weather.humidity;
  const windSpeed = weather.windSpeed;

  if (weather.weather.includes('Hujan')) {
    return 'Cuaca hujan - Kurangi irigasi, pantau drainase';
  }

  if (temp > 35 && humidity < 40) {
    return 'Cuaca panas kering - Tingkatkan irigasi, pastikan cukup air';
  }

  if (windSpeed > 20) {
    return 'Angin kuat - Periksa struktur tanaman, kemungkinan kerusakan';
  }

  if (temp > 30 && humidity > 80) {
    return 'Cuaca panas lembab - Monitor penyakit jamur';
  }

  return 'Kondisi cuaca normal - Lanjutkan manajemen biasa';
}
