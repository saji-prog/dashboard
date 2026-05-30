import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  alerts as mockAlerts,
  fields as mockFields,
  hourlyReadings as mockHourly,
  weatherForecast as mockWeather,
  weeklyYield as mockYield,
} from "../data/mockData";
import type { Alert, Field, SensorReading } from "../data/mockData";
import { checkApiHealth, loadFarmData } from "../api/client";

interface FarmContextValue {
  fields: Field[];
  alerts: Alert[];
  hourlyReadings: SensorReading[];
  weeklyYield: { day: string; predicted: number; actual: number | null }[];
  weatherForecast: { day: string; icon: string; high: number; low: number; rain: number }[];
  dataSource: "api" | "mock";
  loading: boolean;
}

const FarmContext = createContext<FarmContextValue | null>(null);

export function FarmProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<"api" | "mock">("mock");
  const [fields, setFields] = useState<Field[]>(mockFields);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [hourlyReadings, setHourlyReadings] = useState(mockHourly);
  const [weeklyYield, setWeeklyYield] = useState(mockYield);
  const [weatherForecast, setWeatherForecast] = useState(mockWeather);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const apiUp = await checkApiHealth();
      // #region agent log
      fetch('http://127.0.0.1:7909/ingest/5e3e54bc-7a04-494e-a09d-aa7c09b27f42',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a36dcb'},body:JSON.stringify({sessionId:'a36dcb',hypothesisId:'H-A',location:'FarmContext.tsx:load',message:'apiUp result',data:{apiUp},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      if (!apiUp) {
        if (!cancelled) {
          setDataSource("mock");
          setLoading(false);
        }
        return;
      }

      try {
        const data = await loadFarmData();
        // #region agent log
        fetch('http://127.0.0.1:7909/ingest/5e3e54bc-7a04-494e-a09d-aa7c09b27f42',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a36dcb'},body:JSON.stringify({sessionId:'a36dcb',hypothesisId:'H-C',location:'FarmContext.tsx:load',message:'loadFarmData ok',data:{fieldsCount:data.fields.length,alertsCount:data.alerts.length},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        if (!cancelled) {
          setFields(data.fields);
          setAlerts(data.alerts);
          setHourlyReadings(data.hourlyReadings);
          setWeeklyYield(data.weeklyYield);
          setWeatherForecast(data.weatherForecast);
          setDataSource("api");
        }
      } catch (err) {
        // #region agent log
        fetch('http://127.0.0.1:7909/ingest/5e3e54bc-7a04-494e-a09d-aa7c09b27f42',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a36dcb'},body:JSON.stringify({sessionId:'a36dcb',hypothesisId:'H-C',location:'FarmContext.tsx:load',message:'loadFarmData failed',data:{error:String(err)},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        if (!cancelled) setDataSource("mock");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <FarmContext.Provider
      value={{
        fields,
        alerts,
        hourlyReadings,
        weeklyYield,
        weatherForecast,
        dataSource,
        loading,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const ctx = useContext(FarmContext);
  if (!ctx) throw new Error("useFarm must be used within FarmProvider");
  return ctx;
}
