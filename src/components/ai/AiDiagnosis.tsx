import { useState } from "react";
import { Microscope, Loader2, CheckCircle2 } from "lucide-react";
import { apiDiagnose, checkApiHealth } from "../../api/client";
import { diagnoseFromSymptoms, type DiagnosisResult } from "../../services/aiService";

const SYMPTOM_EXAMPLES = [
  "Daun kuning di ujung, mulai dari tanaman tua",
  "Bercak coklat hitam pada daun cabai",
  "Daun jagung dimakan ulat, ada lubang besar",
  "Tanaman layu meski tanah masih lembab",
];

export function AiDiagnosis() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  async function runDiagnosis() {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const useApi = await checkApiHealth();
      const data = useApi
        ? ((await apiDiagnose(symptoms)) as DiagnosisResult)
        : diagnoseFromSymptoms(symptoms);
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/5 bg-[#1a231c] p-5">
      <div className="flex items-center gap-2">
        <Microscope className="h-5 w-5 text-agri-400" />
        <div>
          <h3 className="font-medium text-white">Diagnosis Penyakit AI</h3>
          <p className="text-xs text-white/40">
            Deskripsikan gejala tanaman untuk analisis awal
          </p>
        </div>
      </div>

      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Contoh: Daun padi menguning dari ujung, mulai pada fase vegetatif..."
        rows={4}
        className="mt-4 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-agri-600/50 focus:outline-none"
      />

      <div className="mt-2 flex flex-wrap gap-2">
        {SYMPTOM_EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => setSymptoms(ex)}
            className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/50 hover:border-agri-600/40 hover:text-agri-400"
          >
            {ex.length > 40 ? ex.slice(0, 40) + "…" : ex}
          </button>
        ))}
      </div>

      <button
        onClick={runDiagnosis}
        disabled={loading || !symptoms.trim()}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-agri-600 py-2.5 text-sm font-medium text-white hover:bg-agri-500 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Menganalisis gejala...
          </>
        ) : (
          <>
            <Microscope className="h-4 w-4" />
            Analisis dengan AI
          </>
        )}
      </button>

      {result && (
        <div className="mt-5 space-y-4 rounded-lg border border-agri-600/30 bg-agri-900/20 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-agri-400">Hasil diagnosis</p>
              <h4 className="text-lg font-semibold text-white">{result.condition}</h4>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-agri-400">{result.confidence}%</p>
              <p className="text-xs text-white/40">keyakinan AI</p>
            </div>
          </div>

          <div className="flex gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                result.severity === "berat"
                  ? "bg-red-500/20 text-red-400"
                  : result.severity === "sedang"
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-agri-500/20 text-agri-400"
              }`}
            >
              Tingkat: {result.severity}
            </span>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-white">Penanganan</p>
            <ul className="space-y-1.5">
              {result.treatment.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-agri-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-white">Pencegahan</p>
            <ul className="space-y-1.5">
              {result.prevention.map((p, i) => (
                <li key={i} className="text-sm text-white/60">
                  • {p}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/30">
            * Diagnosis AI bersifat awal. Konfirmasi dengan penyuluh pertanian untuk
            keputusan pestisida/pupuk.
          </p>
        </div>
      )}
    </div>
  );
}
