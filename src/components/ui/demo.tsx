'use client'

import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineHero() {
  return (
    <div className="w-full h-[600px] bg-neutral-950 relative overflow-hidden rounded-3xl border border-neutral-800 shadow-2xl mb-8 group">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* 3D Background - Placed absolutely to fill the container */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full md:w-2/3 h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Content Overlay - Pointer events none so 3D model can be interacted with behind it */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center p-8 md:p-16 pointer-events-none bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 max-w-2xl leading-tight tracking-tight">
          Geleceğin Teknolojisini <br /> Bugünden Üret.
        </h1>
        <p className="mt-6 text-neutral-300 max-w-xl text-lg leading-relaxed font-medium drop-shadow-md">
          Açık kaynak donanım, gelişmiş robotik devreler ve yapay zeka destekli sistemler. Hayalindeki projeyi bul, elindeki parçaları eşleştir ve anında üretmeye başla.
        </p>
        
        <div className="mt-10 flex flex-wrap gap-4 pointer-events-auto">
          <button className="px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95">
            Projeleri Keşfet
          </button>
          <button className="px-8 py-3.5 bg-neutral-800/80 text-white font-bold rounded-full hover:bg-neutral-700 transition-all border border-neutral-600 backdrop-blur-md hover:scale-105 active:scale-95">
            Elindeki Malzemeleri Ekle
          </button>
        </div>
      </div>
    </div>
  )
}
