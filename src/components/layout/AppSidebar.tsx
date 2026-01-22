import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FilePlus,
  FileCheck,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MedAegisLogo } from "@/components/icons/MedAegisLogo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Issue Report", url: "/issue-report", icon: FilePlus },
  { title: "Issued Reports", url: "/issued-reports", icon: FileCheck },
  { title: "Certificate Status", url: "/certificate", icon: ShieldCheck },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <MedAegisLogo 
          showText={!collapsed} 
          size="md"
          className="text-sidebar-foreground"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "shrink-0 transition-transform duration-200",
                  !isActive && "group-hover:scale-110"
                )}
              />
              {!collapsed && (
                <span className="font-medium text-sm truncate">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <NavLink
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive"
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span className="font-medium text-sm">Logout</span>}
        </NavLink>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-9 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
    </aside>
  );
};
