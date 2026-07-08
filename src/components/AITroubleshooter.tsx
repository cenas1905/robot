"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AITroubleshooter() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  
  // Dummy messages for UI demonstration
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Merhaba! Projende bir hata mı alıyorsun veya koda mı ihtiyacın var? Bana sorabilirsin." }
  ]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const userMessage = { role: "user", content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    
    try {
      const response = await fetch("/api/troubleshoot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: data.result }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: `Hata: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sunucuya bağlanırken bir hata oluştu." }]);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[380px] bg-neutral-900 border border-neutral-800 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-neutral-950 p-4 border-b border-neutral-800 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <h3 className="font-bold text-white">AI Hata Çözücü</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-neutral-800 text-neutral-200 rounded-bl-none border border-neutral-700"
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Kod hatasını buraya yapıştır..."
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="bg-blue-600 disabled:bg-neutral-800 text-white p-2.5 rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
