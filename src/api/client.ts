import type { Alert, Field, SensorReading } from "../data/mockData";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url);
  // #region agent log
  fetch('http://127.0.0.1:7909/ingest/5e3e54bc-7a04-494e-a09d-aa7c09b27f42',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a36dcb'},body:JSON.stringify({sessionId:'a36dcb',hypothesisId:'H-C',location:'client.ts:fetchJson',message:'fetch result',data:{path,url,ok:res.ok,status:res.status},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

type ApiField = Field & { farmId?: string; createdAt?: string; updatedAt?: string };
type ApiAlert = {
  id: string;
  fieldId: string;
  type: Alert["type"];
  severity: Alert["severity"];
  message: string;
  timeLabel: string;
};
type ApiReading = { timeLabel: string; moisture: number; temp: number; humidity: number };
type ApiYield = { day: string; predicted: number; actual: number | null };
type ApiWeather = { day: string; icon: string; high: number; low: number; rain: number };

export interface FarmData {
  fields: Field[];
  alerts: Alert[];
  hourlyReadings: SensorReading[];
  weeklyYield: { day: string; predicted: number; actual: number | null }[];
  weatherForecast: ApiWeather[];
  source: "api" | "mock";
}

export async function loadFarmData(): Promise<FarmData> {
  const [fields, alerts, hourly, yieldData, weather] = await Promise.all([
    fetchJson<ApiField[]>("/api/fields"),
    fetchJson<ApiAlert[]>("/api/alerts"),
    fetchJson<ApiReading[]>("/api/sensors/hourly"),
    fetchJson<ApiYield[]>("/api/sensors/yield"),
    fetchJson<ApiWeather[]>("/api/sensors/weather"),
  ]);

  return {
    fields: fields.map(({ farmId: _f, createdAt: _c, updatedAt: _u, ...f }) => f),
    alerts: alerts.map((a) => ({
      id: a.id,
      fieldId: a.fieldId,
      type: a.type,
      severity: a.severity,
      message: a.message,
      time: a.timeLabel,
    })),
    hourlyReadings: hourly.map((r) => ({
      time: r.timeLabel,
      moisture: r.moisture,
      temp: r.temp,
      humidity: r.humidity,
    })),
    weeklyYield: yieldData,
    weatherForecast: weather,
    source: "api",
  };
}

export async function apiChat(message: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Chat API failed");
  const data = (await res.json()) as { reply: string };
  return data.reply;
}

export async function apiDiagnose(symptoms: string) {
  const res = await fetch(`${API_BASE}/api/ai/diagnose`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms }),
  });
  if (!res.ok) throw new Error("Diagnose API failed");
  return res.json();
}

export async function apiRecommendations() {
  return fetchJson<
    {
      id: string;
      priority: "high" | "medium" | "low";
      title: string;
      description: string;
      field?: string;
      action: string;
    }[]
  >("/api/ai/recommendations");
}

export async function checkApiHealth(): Promise<boolean> {
  const url = `${API_BASE}/api/health`;
  try {
    const res = await fetch(url);
    const ok = res.ok;
    // #region agent log
    fetch('http://127.0.0.1:7909/ingest/5e3e54bc-7a04-494e-a09d-aa7c09b27f42',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a36dcb'},body:JSON.stringify({sessionId:'a36dcb',hypothesisId:'H-A',location:'client.ts:checkApiHealth',message:'health check',data:{url,ok,status:res.status},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return ok;
  } catch (err) {
    // #region agent log
    fetch('http://127.0.0.1:7909/ingest/5e3e54bc-7a04-494e-a09d-aa7c09b27f42',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a36dcb'},body:JSON.stringify({sessionId:'a36dcb',hypothesisId:'H-A',location:'client.ts:checkApiHealth',message:'health check failed',data:{url,error:String(err)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return false;
  }
}
