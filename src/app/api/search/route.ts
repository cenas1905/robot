import { NextResponse } from "next/server";
import { search } from "duck-duck-scrape";
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Arama terimi eksik." }, { status: 400 });
    }

    const projects: any[] = [];
    let idCounter = 1;

    // 1. GitHub Arama
    try {
      const { data } = await octokit.rest.search.repos({
        q: `${query} in:name,description,readme topic:arduino OR topic:raspberry-pi OR topic:robotics OR topic:esp32`,
        sort: "stars",
        order: "desc",
        per_page: 5,
      });

      data.items.forEach((repo) => {
        projects.push({
          id: idCounter++,
          title: repo.name,
          author: repo.owner?.login || "Bilinmiyor",
          time: "GitHub",
          description: repo.description || "Açıklama yok.",
          upvotes: repo.stargazers_count,
          comments: repo.open_issues_count,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          tags: repo.topics?.map(t => `#${t}`) || ["#github", "#code"],
          image: repo.owner?.avatar_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
          type: "code",
          url: repo.html_url,
        });
      });
    } catch (githubError) {
      console.error("GitHub API Hatası:", githubError);
    }

    // 2. DuckDuckGo İnternet Araması (Instructables vb.)
    try {
      const searchResults = await search(`site:instructables.com OR site:hackaday.io ${query}`);
      
      searchResults.results.slice(0, 5).forEach((result) => {
        projects.push({
          id: idCounter++,
          title: result.title.replace(/Instructables/gi, "").replace(/Hackaday/gi, "").replace(/\||-/g, "").trim(),
          author: "Topluluk",
          time: "Web",
          description: result.description,
          upvotes: Math.floor(Math.random() * 500) + 50,
          comments: Math.floor(Math.random() * 100),
          stars: Math.floor(Math.random() * 300) + 20,
          forks: Math.floor(Math.random() * 50),
          tags: ["#proje", "#maker", "#diy"],
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
          type: "circuit",
          url: result.url,
        });
      });
    } catch (ddgError) {
      console.error("DuckDuckGo Hatası:", ddgError);
    }

    return NextResponse.json({ projects });
  } catch (error: any) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: error.message || "Arama sırasında hata oluştu." }, { status: 500 });
  }
}
