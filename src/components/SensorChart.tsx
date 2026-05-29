import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { hourlyReadings } from "../data/mockData";

export function SensorChart() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#1a231c] p-5">
      <h3 className="font-medium text-white">Sensor Real-time Hari Ini</h3>
      <p className="text-xs text-white/40">Kelembaban tanah, suhu, dan kelembaban udara</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hourlyReadings}>
            <defs>
              <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="time" stroke="#ffffff40" fontSize={12} />
            <YAxis stroke="#ffffff40" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "#1a231c",
                border: "1px solid #ffffff15",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="moisture"
              name="Kelembaban tanah (%)"
              stroke="#0ea5e9"
              fill="url(#moistureGrad)"
            />
            <Area
              type="monotone"
              dataKey="temp"
              name="Suhu (°C)"
              stroke="#f59e0b"
              fill="url(#tempGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
