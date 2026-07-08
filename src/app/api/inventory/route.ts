import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { materials } = await req.json();

    if (!materials || materials.length === 0) {
      return NextResponse.json({ error: "Lütfen malzeme listesi gönderin." }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes("buraya_gemini_anahtarini_yapistir")) {
      return NextResponse.json(
        { error: "Gemini API Anahtarı eksik." },
        { status: 500 }
      );
    }

    const prompt = `Şu malzemeleri kullanarak harika bir Maker/Robotik projesi fikri üret: ${materials.join(", ")}. 
Lütfen cevabını sadece bir JSON objesi olarak dön (başka hiçbir metin ekleme). JSON formatı şu şekilde olmalı:
{
  "title": "Projenin havalı adı",
  "description": "Projenin ne işe yaradığı ve bu malzemelerle nasıl yapılacağının 2-3 cümlelik özeti",
  "tags": ["#etiket1", "#etiket2", "#etiket3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    let resultText = response.text || "";
    // Clean up potential markdown formatting from Gemini response
    resultText = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let aiProject;
    try {
      aiProject = JSON.parse(resultText);
    } catch (parseError) {
      console.error("JSON Parse Error:", resultText);
      return NextResponse.json({ error: "Yapay zeka yanıtı anlaşılamadı." }, { status: 500 });
    }

    // Format the AI project into the feed structure
    const project = {
      id: Math.floor(Math.random() * 10000),
      title: aiProject.title,
      author: "Gemini AI",
      time: "Şimdi üretildi",
      description: aiProject.description,
      upvotes: Math.floor(Math.random() * 900) + 100,
      comments: Math.floor(Math.random() * 50) + 5,
      stars: Math.floor(Math.random() * 400) + 50,
      forks: Math.floor(Math.random() * 30),
      tags: aiProject.tags || ["#ai", "#maker"],
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop",
      type: "circuit",
      isAiGenerated: true // Custom flag to show it's made for them
    };

    return NextResponse.json({ project });
  } catch (error: any) {
    console.error("Inventory API Error:", error);
    return NextResponse.json({ error: error.message || "Proje üretilirken hata oluştu." }, { status: 500 });
  }
}
