"use client";

import { Cpu, Code, MessageSquare, Star, GitFork, ArrowUp, ArrowDown } from "lucide-react";
import { SplineHero } from "@/components/ui/demo";

// Placeholder data simulating a database fetch
const projects = [
  {
    id: 1,
    title: "6 Eksenli Robot Kol (Arduino & Servo)",
    author: "maker_ahmet",
    time: "2 saat önce",
    description: "Tamamen 3D yazıcı ile basılabilir, 6 adet MG996R servo motor kullanılan ve Arduino Mega ile kontrol edilen endüstriyel robot kol prototipi.",
    upvotes: 342,
    comments: 45,
    stars: 128,
    forks: 34,
    tags: ["#robotkol", "#arduino", "#3d-print"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop", // placeholder
    type: "circuit",
  },
  {
    id: 2,
    title: "ESP32 Akıllı Ev Otomasyon Röle Kartı",
    author: "iot_master",
    time: "5 saat önce",
    description: "ESP32 ve 8'li röle kartı kullanarak evdeki tüm lambaları ve prizleri web arayüzünden kontrol edebileceğiniz tam sistem devre şeması ve kodları.",
    upvotes: 856,
    comments: 112,
    stars: 450,
    forks: 89,
    tags: ["#esp32", "#iot", "#smarthome"],
    type: "code",
  },
  {
    id: 3,
    title: "Çizgi İzleyen Robot PID Algoritması (C++)",
    author: "c_guru",
    time: "1 gün önce",
    description: "QTR-8RC sensör dizisi için optimize edilmiş, virajları yavaşlamadan dönebilen gelişmiş PID kontrol algoritması.",
    upvotes: 210,
    comments: 18,
    stars: 85,
    forks: 22,
    tags: ["#algoritma", "#pid", "#c++"],
    type: "code",
  }
];

export default function Feed() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 w-full space-y-8">
      {/* 3D Interactive Hero Section */}
      <SplineHero />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Popüler Projeler</h1>
        <div className="flex bg-neutral-900 rounded-lg p-1">
          <button className="px-4 py-1.5 bg-neutral-800 text-white rounded-md text-sm font-medium">Sıcak</button>
          <button className="px-4 py-1.5 text-neutral-400 hover:text-white rounded-md text-sm font-medium">Yeni</button>
          <button className="px-4 py-1.5 text-neutral-400 hover:text-white rounded-md text-sm font-medium">En İyiler</button>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <article key={project.id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors cursor-pointer">
            <div className="flex">
              {/* Upvote Column (Reddit Style) */}
              <div className="bg-neutral-950/50 w-12 flex flex-col items-center py-4 space-y-2 border-r border-neutral-800/50">
                <button className="text-neutral-500 hover:text-orange-500"><ArrowUp className="w-5 h-5" /></button>
                <span className="text-sm font-bold text-neutral-300">{project.upvotes}</span>
                <button className="text-neutral-500 hover:text-blue-500"><ArrowDown className="w-5 h-5" /></button>
              </div>

              {/* Content Column */}
              <div className="flex-1 p-4">
                <div className="flex items-center text-xs text-neutral-500 mb-2 space-x-2">
                  <span className="font-semibold text-neutral-300">@{project.author}</span>
                  <span>•</span>
                  <span>{project.time}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-2 text-white">{project.title}</h2>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                {project.image && (
                  <div className="w-full h-48 bg-neutral-800 rounded-lg mb-4 overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-neutral-400 hover:text-neutral-200 space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-medium">{project.comments} Yorum</span>
                    </div>
                    <div className="flex items-center text-neutral-400 hover:text-yellow-500 space-x-1">
                      <Star className="w-4 h-4" />
                      <span className="text-xs font-medium">{project.stars} Yıldız</span>
                    </div>
                    <div className="flex items-center text-neutral-400 hover:text-neutral-200 space-x-1">
                      <GitFork className="w-4 h-4" />
                      <span className="text-xs font-medium">{project.forks} Fork</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-neutral-800 text-blue-400 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
