import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Wind, Droplets, Eye } from 'lucide-react';
import {
  fetchWeather,
  WeatherData,
  getWindDirectionName,
  getAgriRecommendation,
} from '../services/weatherService';

interface BmkgWeatherWidgetProps {
  province?: string;
  district?: string;
}

export const BmkgWeatherWidget: React.FC<BmkgWeatherWidgetProps> = ({
  province = 'DKI Jakarta',
  district = 'JAKARTA PUSAT',
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        const data = await fetchWeather(province, district);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();

    // Refresh setiap 30 menit
    const interval = setInterval(loadWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [province, district]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-6 text-white">
        <p>Memuat data cuaca...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-lg p-6 text-white">
        <p>Error: {error || 'Data tidak tersedia'}</p>
      </div>
    );
  }

  const recommendation = getAgriRecommendation(weather);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">Cuaca</h3>
          <p className="text-sm opacity-90">
            {district}, {province}
          </p>
        </div>
        <Cloud className="w-8 h-8" />
      </div>

      {/* Suhu Utama */}
      <div className="mb-6">
        <div className="text-5xl font-bold mb-2">{weather.temperature}°C</div>
        <p className="text-lg">{weather.weather}</p>
        <p className="text-sm opacity-90">
          Terasa seperti {weather.temperatureFeels}°C
        </p>
      </div>

      {/* Min/Max */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm opacity-80">Maksimal</p>
          <p className="text-2xl font-bold">{weather.temperatureMax}°C</p>
        </div>
        <div>
          <p className="text-sm opacity-80">Minimal</p>
          <p className="text-2xl font-bold">{weather.temperatureMin}°C</p>
        </div>
      </div>

      {/* Detail Info */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4" />
          <span>
            Kelembaban: <strong>{weather.humidity}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4" />
          <span>
            Angin: <strong>{weather.windSpeed} knot</strong>
          </span>
        </div>
        <div className="text-xs">Arah: {getWindDirectionName(weather.windDirection)}</div>
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span>
            Jarak pandang: <strong>{weather.visibility} km</strong>
          </span>
        </div>
      </div>

      {/* Rekomendasi Pertanian */}
      <div className="bg-white bg-opacity-20 rounded-lg p-4">
        <p className="text-sm font-semibold mb-2">💡 Rekomendasi Pertanian:</p>
        <p className="text-sm">{recommendation}</p>
      </div>

      {/* Info Teknis */}
      <div className="text-xs opacity-75 mt-4 border-t border-white border-opacity-30 pt-3">
        <p>
          Update: {new Date(weather.datetime).toLocaleString('id-ID')}
        </p>
        <p>Sumber: {weather.operator}</p>
      </div>
    </div>
  );
};
