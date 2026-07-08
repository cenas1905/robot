"use client";

import { useState } from "react";
import { Bot, Plus, X, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function InventoryMatcher() {
  const [items, setItems] = useState(["Arduino Uno", "L298N Motor Sürücü", "2x DC Motor"]);
  const [newItem, setNewItem] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const removeItem = (itemToRemove: string) => {
    setItems(items.filter(item => item !== itemToRemove));
  };

  const handleSearch = async () => {
    if (items.length === 0) return;
    setIsSearching(true);
    
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ materials: items }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuggestedProjects([data.project]); // API returns a single AI generated project for now
      } else {
        alert("Hata: " + data.error);
      }
    } catch (error) {
      alert("Sunucuya bağlanırken hata oluştu.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 w-full">
      <div className="mb-8">
        <div className="inline-flex items-center space-x-2 text-emerald-400 bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-800/50 mb-4">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">Yapay Zeka Malzeme Eşleştirici</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Elimdeki Malzemelerle Ne Yapabilirim?</h1>
        <p className="text-neutral-400">Çekmecende duran sensörleri ve kartları listeye ekle, yapay zeka senin için yapabileceğin en iyi projeleri internetten bulup getirsin.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-xl">
        <form onSubmit={addItem} className="flex space-x-2 mb-6">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Malzeme ekle (Örn: Mesafe Sensörü HC-SR04)"
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
          />
          <button type="submit" className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 rounded-xl transition-colors font-medium flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Ekle
          </button>
        </form>

        <div className="flex flex-wrap gap-3 mb-8">
          {items.map(item => (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={item}
              className="flex items-center space-x-2 bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-xl"
            >
              <span className="text-sm font-medium">{item}</span>
              <button onClick={() => removeItem(item)} className="text-neutral-400 hover:text-red-400">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          {items.length === 0 && (
            <span className="text-neutral-500 text-sm italic">Henüz malzeme eklenmedi...</span>
          )}
        </div>

        <button 
          onClick={handleSearch}
          disabled={items.length === 0 || isSearching}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 text-lg shadow-lg shadow-emerald-900/20"
        >
          {isSearching ? (
            <>
              <Search className="w-6 h-6 animate-spin" />
              <span>Yapay Zeka Analiz Ediyor...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>Bu Malzemelerle Proje Bul</span>
            </>
          )}
        </button>
      </div>

      {/* Results placeholder */}
      <div className="space-y-4 opacity-50">
        <h2 className="text-xl font-bold mb-4">Önerilen Projeler (Simülasyon)</h2>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white mb-1">Bluetooth Kontrollü Araba</h3>
            <p className="text-sm text-neutral-400">Elindeki malzemelerin %90'ı ile yapabilirsin. Sadece HC-06 Bluetooth modülü eksik.</p>
          </div>
          <button className="px-4 py-2 bg-neutral-800 rounded-lg text-sm font-medium hover:bg-neutral-700">Detaylar</button>
        </div>
      </div>
    </div>
  );
}
