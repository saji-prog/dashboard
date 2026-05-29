import { useMemo } from "react";
import { Sparkles, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { generateRecommendations } from "../../services/aiService";

const priorityConfig = {
  high: {
    icon: AlertCircle,
    color: "text-red-400 bg-red-500/15 border-red-500/30",
    label: "Prioritas tinggi",
  },
  medium: {
    icon: AlertTriangle,
    color: "text-amber-400 bg-amber-500/15 border-amber-500/30",
    label: "Prioritas sedang",
  },
  low: {
    icon: Info,
    color: "text-sky-400 bg-sky-500/15 border-sky-500/30",
    label: "Prioritas rendah",
  },
};

export function AiRecommendations() {
  const recommendations = useMemo(() => generateRecommendations(), []);

  return (
    <div className="rounded-xl border border-white/5 bg-[#1a231c] p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-agri-400" />
        <div>
          <h3 className="font-medium text-white">Rekomendasi AI</h3>
          <p className="text-xs text-white/40">
            Dihasilkan dari data sensor — diperbarui real-time
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {recommendations.map((rec) => {
          const config = priorityConfig[rec.priority];
          const Icon = config.icon;
          return (
            <div
              key={rec.id}
              className={`rounded-lg border p-4 ${config.color}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-medium text-white">{rec.title}</h4>
                    <span className="text-xs opacity-60">{config.label}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{rec.description}</p>
                  <p className="mt-2 text-sm font-medium text-agri-300">
                    → {rec.action}
                  </p>
                  {rec.field && (
                    <p className="mt-1 text-xs text-white/40">{rec.field}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
