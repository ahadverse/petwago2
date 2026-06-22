"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Users,
  LogOut,
  PawPrint,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: Package },
  { label: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className='w-60 shrink-0 bg-dark text-white min-h-screen flex flex-col'>
      <div className='flex items-center gap-2 px-5 py-5 border-b border-white/10'>
        <PawPrint className='w-6 h-6 text-primary' />
        <span className='font-bold text-lg'>PetWago</span>
      </div>

      <nav className='flex-1 px-3 py-4 space-y-1'>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className='w-4 h-4' />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className='px-3 py-4 border-t border-white/10'>
        <button
          onClick={handleLogout}
          className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors w-full'
        >
          <LogOut className='w-4 h-4' />
          Logout
        </button>
      </div>
    </aside>
  );
}
