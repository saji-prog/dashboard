import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFarm } from "../context/FarmContext";

export function YieldChart() {
  const { weeklyYield } = useFarm();
  return (
    <div className="rounded-xl border border-white/5 bg-[#1a231c] p-5">
      <h3 className="font-medium text-white">Prediksi Hasil Panen (kg)</h3>
      <p className="text-xs text-white/40">AI forecast vs aktual minggu ini</p>
      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyYield}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="day" stroke="#ffffff40" fontSize={12} />
            <YAxis stroke="#ffffff40" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "#1a231c",
                border: "1px solid #ffffff15",
                borderRadius: 8,
              }}
            />
            <Legend />
            <Bar dataKey="predicted" name="Prediksi AI" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="actual" name="Aktual" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
