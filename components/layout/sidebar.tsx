"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderTree,
  Package,
  Users,
  UserCog,
  ShoppingCart,
  Settings,
  BarChart3,
  LogOut,
  ChevronLeft,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/", label: "داشبورد", icon: LayoutDashboard },
  { href: "/categories", label: "دسته‌بندی‌ها", icon: FolderTree },
  { href: "/products", label: "محصولات", icon: Package },
  { href: "/orders", label: "سفارشات", icon: ShoppingCart },
  { href: "/customers", label: "مشتریان", icon: Users },
  { href: "/users", label: "کاربران", icon: UserCog },
  { href: "/reports", label: "گزارش‌ها", icon: BarChart3 },
  { href: "/settings", label: "تنظیمات", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleCollapsed } = useUIStore();
  const { logout, user } = useAuthStore();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex flex-col border-l bg-sidebar text-sidebar-foreground transition-all duration-300",
        sidebarCollapsed ? "w-[70px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between gap-2 border-b px-4">
        {!sidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Store className="size-6 text-primary" />
            <span>پنل مدیریت</span>
          </Link>
        )}
        {sidebarCollapsed && (
          <Link href="/" className="mx-auto">
            <Store className="size-6 text-primary" />
          </Link>
        )}
        {!sidebarCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="size-8"
          >
            <ChevronLeft className="size-4 rotate-180" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                sidebarCollapsed && "justify-center px-2"
              )}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="size-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User section */}
      <div className="p-3">
        {!sidebarCollapsed && user && (
          <div className="mb-2 rounded-lg bg-sidebar-accent/50 px-3 py-2">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10",
            sidebarCollapsed && "justify-center px-2"
          )}
          onClick={logout}
        >
          <LogOut className="size-5" />
          {!sidebarCollapsed && <span>خروج</span>}
        </Button>
        {sidebarCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="mt-2 w-full"
          >
            <ChevronLeft className="size-4" />
          </Button>
        )}
      </div>
    </aside>
  );
}
