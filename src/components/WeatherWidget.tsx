import { Cloud, CloudRain, Sun } from "lucide-react";
import { useFarm } from "../context/FarmContext";

const icons = {
  sun: Sun,
  cloud: Cloud,
  "cloud-rain": CloudRain,
};

export function WeatherWidget() {
  const { weatherForecast } = useFarm();
  return (
    <div className="rounded-xl border border-white/5 bg-[#1a231c] p-5">
      <h3 className="font-medium text-white">Prakiraan Cuaca</h3>
      <p className="text-xs text-white/40">4 hari ke depan</p>
      <div className="mt-4 space-y-3">
        {weatherForecast.map((day) => {
          const Icon = icons[day.icon as keyof typeof icons];
          return (
            <div
              key={day.day}
              className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-sky-400" />
                <span className="text-sm text-white">{day.day}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-white/50">{day.rain}% hujan</span>
                <span className="text-white">
                  {day.low}° – {day.high}°C
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
