import { Droplets, Thermometer, Leaf } from "lucide-react";
import type { Field } from "../data/mockData";

const statusStyles = {
  optimal: "bg-agri-500/20 text-agri-400",
  warning: "bg-amber-500/20 text-amber-400",
  critical: "bg-red-500/20 text-red-400",
};

const statusLabels = {
  optimal: "Optimal",
  warning: "Perhatian",
  critical: "Kritis",
};

interface FieldCardProps {
  field: Field;
  onSelect?: () => void;
  embedded?: boolean;
}

export function FieldCard({ field, onSelect, embedded }: FieldCardProps) {
  const className = embedded
    ? "w-full text-left"
    : "w-full rounded-xl border border-white/5 bg-[#1a231c] p-4 text-left transition-colors hover:border-agri-600/30 hover:bg-[#1e2820]";

  const content = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-white">{field.name}</h3>
          <p className="text-sm text-white/50">{field.crop}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[field.status]}`}
        >
          {statusLabels[field.status]}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-sky-400" />
          <div>
            <p className="text-xs text-white/40">Kelembaban</p>
            <p className="text-sm font-medium text-white">{field.soilMoisture}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-amber-400" />
          <div>
            <p className="text-xs text-white/40">Suhu</p>
            <p className="text-sm font-medium text-white">{field.temperature}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-agri-400" />
          <div>
            <p className="text-xs text-white/40">Kesehatan</p>
            <p className="text-sm font-medium text-white">{field.health}%</p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-xs text-white/40">
          <span>NDVI</span>
          <span>{field.ndvi.toFixed(2)}</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full ${
              field.health >= 80
                ? "bg-agri-500"
                : field.health >= 60
                  ? "bg-amber-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${field.health}%` }}
          />
        </div>
      </div>
    </>
  );

  if (embedded) {
    return <div className={className}>{content}</div>;
  }

  return (
    <button type="button" onClick={onSelect} className={className}>
      {content}
    </button>
  );
}
