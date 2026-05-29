import {
  LayoutDashboard,
  Map,
  Bell,
  Sparkles,
  Settings,
  Sprout,
} from "lucide-react";

export type NavItem = "dashboard" | "fields" | "alerts" | "ai";

interface SidebarProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
  alertCount: number;
}

const navItems: { id: NavItem; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "fields", label: "Lahan", icon: Map },
  { id: "alerts", label: "Peringatan", icon: Bell },
  { id: "ai", label: "AI Assistant", icon: Sparkles },
];

export function Sidebar({ active, onNavigate, alertCount }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/5 bg-[#121a14] max-lg:hidden">
      <div className="flex items-center gap-3 border-b border-white/5 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-agri-600">
          <Sprout className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">AgriMonitor</h1>
          <p className="text-xs text-white/40">Smart Farming</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active === id
                ? "bg-agri-600/20 text-agri-400"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
            {id === "alerts" && alertCount > 0 && (
              <span className="ml-auto rounded-full bg-red-500/90 px-2 py-0.5 text-xs text-white">
                {alertCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="border-t border-white/5 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/50 hover:bg-white/5 hover:text-white">
          <Settings className="h-5 w-5" />
          Pengaturan
        </button>
        <div className="mt-3 rounded-lg bg-agri-900/40 px-3 py-2">
          <p className="text-xs text-agri-300">Kebun Sumber Rejeki</p>
          <p className="text-xs text-white/40">6.0 ha · 4 blok aktif</p>
        </div>
      </div>
    </aside>
  );
}
