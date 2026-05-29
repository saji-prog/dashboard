import { LayoutDashboard, Map, Bell, Sparkles } from "lucide-react";
import type { NavItem } from "./Sidebar";

interface MobileNavProps {
  active: NavItem;
  onNavigate: (item: NavItem) => void;
  alertCount: number;
}

const items: { id: NavItem; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "fields", label: "Lahan", icon: Map },
  { id: "alerts", label: "Alert", icon: Bell },
  { id: "ai", label: "AI", icon: Sparkles },
];

export function MobileNav({ active, onNavigate, alertCount }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-white/5 bg-[#121a14] lg:hidden">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onNavigate(id)}
          className={`relative flex flex-1 flex-col items-center gap-1 py-3 text-xs ${
            active === id ? "text-agri-400" : "text-white/50"
          }`}
        >
          <Icon className="h-5 w-5" />
          {label}
          {id === "alerts" && alertCount > 0 && (
            <span className="absolute right-1/4 top-2 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>
      ))}
    </nav>
  );
}
