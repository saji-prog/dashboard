import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  accent?: "green" | "blue" | "amber" | "red";
}

const accentMap = {
  green: "text-agri-400 bg-agri-600/15",
  blue: "text-sky-400 bg-sky-500/15",
  amber: "text-amber-400 bg-amber-500/15",
  red: "text-red-400 bg-red-500/15",
};

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  trend,
  accent = "green",
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#1a231c] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/50">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-white/40">{sub}</p>}
        </div>
        <div className={`rounded-lg p-2.5 ${accentMap[accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <p
          className={`mt-3 text-xs font-medium ${
            trend.positive ? "text-agri-400" : "text-red-400"
          }`}
        >
          {trend.positive ? "↑" : "↓"} {trend.value}
        </p>
      )}
    </div>
  );
}
