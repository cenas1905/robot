import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes("buraya_gemini_anahtarini_yapistir")) {
      return NextResponse.json(
        { error: "Gemini API Anahtarı eksik. Lütfen .env.local dosyasını güncelleyin." },
        { status: 500 }
      );
    }

    // Convert messages to Gemini format
    // Since GoogleGenAI SDK usually expects a specific format or we can just join them as a prompt
    let conversationHistory = "Sen MakerHub platformunun donanım ve robotik uzmanı yapay zeka asistanısın. Kullanıcılar Arduino, Raspberry Pi, ESP32, sensörler, motorlar, devre şemaları ve C++/Python kodlaması hakkında hatalar alıp sana soracaklar. Açıklayıcı, kod hatalarını düzelten ve şema pin bağlantılarını doğru tarif eden teknik ama dostane cevaplar ver.\n\n";
    
    messages.forEach((msg: any) => {
      const role = msg.role === "user" ? "Kullanıcı" : "Asistan";
      conversationHistory += `${role}: ${msg.content}\n`;
    });
    conversationHistory += "Asistan: ";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: conversationHistory,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    });

    return NextResponse.json({ result: response.text || "" });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: error.message || "Bilinmeyen bir hata oluştu." }, { status: 500 });
  }
}
