"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Cpu, Code, Cuboid, Flame, Bot } from "lucide-react";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Tüm Projeler", href: "/", icon: Home },
    { name: "Trend Olanlar", href: "/trending", icon: Flame },
    { name: "Devre Şemaları", href: "/category/circuits", icon: Cpu },
    { name: "Hazır Kodlar", href: "/category/code", icon: Code },
    { name: "3D Modeller", href: "/category/models", icon: Cuboid },
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col border-r border-neutral-800 bg-neutral-950/50 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-1 mb-8">
        <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Keşfet</h3>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-neutral-800 text-white" 
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-blue-400" : "")} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Yapay Zeka Araçları</h3>
        <Link
          href="/inventory"
          className={clsx(
            "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-emerald-400 hover:bg-emerald-900/20",
            pathname === "/inventory" ? "bg-emerald-900/20" : ""
          )}
        >
          <Bot className="w-5 h-5" />
          <span className="font-medium">Malzemelerle Bul</span>
        </Link>
      </div>

      {/* Placeholder for tags/topics */}
      <div className="mt-8">
        <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Popüler Etiketler</h3>
        <div className="flex flex-wrap gap-2 px-3">
          {["#arduino", "#robotkol", "#esp32", "#raspberrypi"].map(tag => (
            <span key={tag} className="text-xs text-blue-400 hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
