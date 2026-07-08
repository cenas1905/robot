"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Cpu, Code, MessageSquare, Star, GitFork, ArrowUp, ArrowDown, Search as SearchIcon, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        
        if (res.ok) {
          setProjects(data.projects || []);
        } else {
          setError(data.error || "Arama sırasında bir hata oluştu.");
        }
      } catch (err) {
        setError("Sunucuya bağlanılamadı.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 w-full space-y-8">
      <div className="flex flex-col space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <SearchIcon className="w-8 h-8 mr-3 text-blue-500" />
          Arama Sonuçları
        </h1>
        {query && <p className="text-neutral-400">"{query}" için web'de ve GitHub'da bulunan projeler.</p>}
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
          <SearchIcon className="w-12 h-12 mb-4 animate-bounce text-blue-500" />
          <p>İnternet ve GitHub taranıyor, lütfen bekleyin...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl text-center text-red-200">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && projects.length === 0 && (
        <div className="text-center py-20 text-neutral-500">
          <p>"{query}" ile eşleşen bir proje bulunamadı.</p>
        </div>
      )}

      {!isLoading && projects.map((project) => (
        <article key={project.id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors">
          <div className="p-4 md:p-6 flex space-x-4">
            {/* Voting Sidebar */}
            <div className="flex flex-col items-center space-y-1">
              <button className="text-neutral-500 hover:text-orange-500 p-1">
                <ArrowUp className="w-5 h-5" />
              </button>
              <span className="text-sm font-bold text-neutral-200">{project.upvotes}</span>
              <button className="text-neutral-500 hover:text-blue-500 p-1">
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 text-xs text-neutral-400 mb-2">
                <span className="flex items-center font-medium text-blue-400">
                  {project.type === "code" ? <Code className="w-3 h-3 mr-1" /> : <Cpu className="w-3 h-3 mr-1" />}
                  {project.type === "code" ? "Yazılım" : "Devre Şeması"}
                </span>
                <span>•</span>
                <span className="font-medium hover:underline cursor-pointer">{project.author}</span>
                <span>•</span>
                <span>{project.time}</span>
              </div>

              <h2 className="text-xl font-semibold text-neutral-100 mb-2 flex items-center">
                {project.title}
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-neutral-500 hover:text-blue-400">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </h2>
              <p className="text-neutral-300 text-sm mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex items-center space-x-4 text-xs font-medium text-neutral-400">
                <button className="flex items-center space-x-1.5 hover:bg-neutral-800 px-2 py-1.5 rounded transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>{project.comments} Yorum</span>
                </button>
                <button className="flex items-center space-x-1.5 hover:bg-neutral-800 px-2 py-1.5 rounded transition-colors">
                  <Star className="w-4 h-4" />
                  <span>{project.stars}</span>
                </button>
                <button className="flex items-center space-x-1.5 hover:bg-neutral-800 px-2 py-1.5 rounded transition-colors">
                  <GitFork className="w-4 h-4" />
                  <span>{project.forks}</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
