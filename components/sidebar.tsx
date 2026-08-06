"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Boxes,
  Users,
  BarChart3,
  Bell,
  LogOut,
  Database,
  ReceiptText,
  UserCog,
} from "lucide-react";

type SidebarProps = {
  onNavigate?: () => void;
};

const items = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/quotations", "Quotations", FileText],
  ["/orders", "Orders", ShoppingCart],
  ["/inventory", "Inventory", Boxes],
  ["/purchases", "Purchases", ReceiptText],
  ["/customers", "Customers", Users],
  ["/reports", "Reports", BarChart3],
  ["/notifications", "Notifications", Bell],
  ["/users", "User Access", UserCog],
] as const;

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="relative flex h-full w-full flex-col border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 font-bold text-white dark:bg-white dark:text-slate-900">
          ITL
        </div>

        <div>
          <b>ITL Operations</b>
          <p className="text-xs text-slate-500">Hyderabad Branch</p>
        </div>
      </div>

      <nav className="space-y-1">
        {items.map(([href, label, Icon]) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 pt-6">
        <Link
          href="/import"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          <Database size={18} />
          Import Data
        </Link>

        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}