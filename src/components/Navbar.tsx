"use client";

import { Search, Bell, Plus, User, Bot, Wrench } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between px-4 h-16">
      <div className="flex items-center space-x-6 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
          <Wrench className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight">MakerHub</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative hidden md:block">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Projelerde, kodlarda ve şemalarda ara..."
            className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-600 focus:border-blue-500 rounded-lg text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:ring-2 focus:ring-blue-500/20"
          />
        </form>

        <div className="flex items-center space-x-4">
          <Link href="/inventory" className="hidden lg:flex items-center space-x-2 text-sm font-medium text-emerald-400 bg-emerald-900/20 hover:bg-emerald-900/40 px-3 py-1.5 rounded-md border border-emerald-800/50 transition-colors">
            <Bot className="w-4 h-4" />
            <span>Malzemelerle Bul</span>
          </Link>
          <button className="text-neutral-400 hover:text-white p-1">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-neutral-400 hover:text-white p-1">
            <Plus className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}
