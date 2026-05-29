import { useState, useMemo } from "react";
import {
  Droplets,
  Leaf,
  ThermometerSun,
  TrendingUp,
  Bell,
} from "lucide-react";
import { Sidebar, type NavItem } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";
import { StatCard } from "./components/StatCard";
import { FieldCard } from "./components/FieldCard";
import { SensorChart } from "./components/SensorChart";
import { YieldChart } from "./components/YieldChart";
import { WeatherWidget } from "./components/WeatherWidget";
import { AlertsList } from "./components/AlertsList";
import { AiChat } from "./components/ai/AiChat";
import { AiDiagnosis } from "./components/ai/AiDiagnosis";
import { AiRecommendations } from "./components/ai/AiRecommendations";
import { fields, alerts } from "./data/mockData";

function DashboardView() {
  const avgHealth = Math.round(
    fields.reduce((s, f) => s + f.health, 0) / fields.length
  );
  const avgMoisture = Math.round(
    fields.reduce((s, f) => s + f.soilMoisture, 0) / fields.length
  );
  const criticalCount = fields.filter((f) => f.status === "critical").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Dashboard Monitoring</h2>
        <p className="text-sm text-white/50">
          Kebun Sumber Rejeki · Pembaruan terakhir: hari ini, 14:32 WIB
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Kesehatan Rata-rata"
          value={`${avgHealth}%`}
          sub="4 blok lahan aktif"
          icon={Leaf}
          trend={{ value: "+2% vs minggu lalu", positive: true }}
          accent="green"
        />
        <StatCard
          label="Kelembaban Tanah"
          value={`${avgMoisture}%`}
          sub="Target optimal: 55-70%"
          icon={Droplets}
          trend={{
            value: criticalCount > 0 ? `${criticalCount} blok kritis` : "Stabil",
            positive: criticalCount === 0,
          }}
          accent="blue"
        />
        <StatCard
          label="Suhu Rata-rata"
          value="30°C"
          sub="Kelembaban udara 67%"
          icon={ThermometerSun}
          accent="amber"
        />
        <StatCard
          label="Prediksi Panen"
          value="Rp 18.4 jt"
          sub="Estimasi minggu ini"
          icon={TrendingUp}
          trend={{ value: "+3% vs minggu lalu", positive: true }}
          accent="green"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SensorChart />
          <YieldChart />
        </div>
        <div className="space-y-6">
          <WeatherWidget />
          <div className="rounded-xl border border-white/5 bg-[#1a231c] p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white">Peringatan Terbaru</h3>
              <Bell className="h-4 w-4 text-white/40" />
            </div>
            <div className="mt-4">
              <AlertsList alerts={alerts.slice(0, 3)} compact />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-medium text-white">Status Lahan</h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {fields.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Manajemen Lahan</h2>
        <p className="text-sm text-white/50">Detail sensor per blok kebun</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.id}
            className="rounded-xl border border-white/5 bg-[#1a231c] p-5"
          >
            <FieldCard field={field} embedded />
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/5 pt-4 text-sm">
              <div>
                <p className="text-white/40">Luas</p>
                <p className="text-white">{field.areaHa} ha</p>
              </div>
              <div>
                <p className="text-white/40">pH Tanah</p>
                <p className="text-white">{field.soilPh}</p>
              </div>
              <div>
                <p className="text-white/40">Kelembaban Udara</p>
                <p className="text-white">{field.humidity}%</p>
              </div>
              <div>
                <p className="text-white/40">NDVI</p>
                <p className="text-white">{field.ndvi.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsView() {
  const highCount = alerts.filter((a) => a.severity === "high").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Pusat Peringatan</h2>
        <p className="text-sm text-white/50">
          {alerts.length} peringatan aktif
          {highCount > 0 && ` · ${highCount} prioritas tinggi`}
        </p>
      </div>
      <AlertsList alerts={alerts} />
    </div>
  );
}

function AiView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">AI Assistant Pertanian</h2>
        <p className="text-sm text-white/50">
          Chat, diagnosis penyakit, dan rekomendasi cerdas berbasis data sensor
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-[520px]">
          <AiChat />
        </div>
        <div className="space-y-6">
          <AiDiagnosis />
        </div>
      </div>

      <AiRecommendations />
    </div>
  );
}

export default function App() {
  const [nav, setNav] = useState<NavItem>("dashboard");
  const highAlerts = useMemo(
    () => alerts.filter((a) => a.severity === "high" || a.severity === "medium").length,
    []
  );

  return (
    <div className="min-h-screen">
      <Sidebar active={nav} onNavigate={setNav} alertCount={highAlerts} />

      <MobileNav active={nav} onNavigate={setNav} alertCount={highAlerts} />

      <main className="min-h-screen p-4 pb-24 md:p-8 lg:ml-64 lg:pb-8">
        {nav === "dashboard" && <DashboardView />}
        {nav === "fields" && <FieldsView />}
        {nav === "alerts" && <AlertsView />}
        {nav === "ai" && <AiView />}
      </main>
    </div>
  );
}
