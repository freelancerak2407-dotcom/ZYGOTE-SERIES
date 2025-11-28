"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, UploadCloud, Users, Settings, LogOut } from "lucide-react";
import { clsx } from "clsx";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Content", href: "/subjects", icon: BookOpen },
  { name: "Bulk Import", href: "/imports", icon: UploadCloud },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">ZYGOTE</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={clsx(
                "flex items-center px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
              )}
            >
              <Icon size={20} className="mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center px-4 py-3 text-red-400 hover:text-red-300 w-full transition-colors">
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}
