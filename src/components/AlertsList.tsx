import { AlertTriangle, Bug, CloudRain, Droplets, Zap } from "lucide-react";
import type { Alert } from "../data/mockData";
import { fields } from "../data/mockData";

const typeIcons = {
  pest: Bug,
  drought: Droplets,
  disease: AlertTriangle,
  weather: CloudRain,
  irrigation: Zap,
};

const severityColors = {
  low: "border-l-sky-500",
  medium: "border-l-amber-500",
  high: "border-l-red-500",
};

interface AlertsListProps {
  alerts: Alert[];
  compact?: boolean;
}

export function AlertsList({ alerts, compact }: AlertsListProps) {
  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const Icon = typeIcons[alert.type];
        const field = fields.find((f) => f.id === alert.fieldId);
        return (
          <div
            key={alert.id}
            className={`rounded-lg border border-white/5 border-l-4 bg-[#1a231c] ${severityColors[alert.severity]} ${compact ? "p-3" : "p-4"}`}
          >
            <div className="flex gap-3">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-white">{alert.message}</p>
                <p className="mt-1 text-xs text-white/40">
                  {field?.name} · {alert.time}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
