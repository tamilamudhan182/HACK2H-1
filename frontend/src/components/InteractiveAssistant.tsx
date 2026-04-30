"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Loader2, ExternalLink, Bot } from "lucide-react";
import { askAssistant } from "@/lib/api";
import { defaultProfile } from "@/lib/default-profile";
import type { AssistantReply } from "@/lib/types";

type Message = {
  role: "user" | "assistant";
  content: string;
  actions?: AssistantReply["actions"];
};

const SUGGESTED = [
  "When is the registration deadline?",
  "What ID do I need to vote?",
  "How do I find my polling booth?",
  "What happens next?",
];

export function InteractiveAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Greetings! I'm your premium Election Assistant. How can I facilitate your civic journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-assistant", handler);
    return () => window.removeEventListener("open-assistant", handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await askAssistant({ query: text, profile: defaultProfile });
      setMessages(prev => [...prev, { role: "assistant", content: reply.answer, actions: reply.actions }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm experiencing a momentary disconnect. Please consult our FAQs or Timeline." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Action Button - Premium */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 p-5 bg-cyan text-ink rounded-2xl shadow-[0_10px_40px_rgba(34,211,238,0.4)] hover:shadow-[0_15px_50px_rgba(34,211,238,0.6)] transition-all hover:-translate-y-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={false}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        aria-label="Open AI Assistant"
      >
        <Bot className="w-7 h-7" />
      </motion.button>

      {/* Chat Window - Million Dollar Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(10px)" }}
            className="fixed bottom-8 right-8 z-50 w-[420px] h-[650px] flex flex-col premium-glass rounded-[2.5rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)] border border-white/10"
            role="dialog"
          >
            {/* Header - Immersive */}
            <div className="p-6 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan/10 flex items-center justify-center cyan-glow">
                  <Sparkles className="w-6 h-6 text-cyan" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-none">Civic AI</h3>
                  <p className="text-cyan/60 text-[10px] font-bold tracking-widest uppercase mt-1">Advanced Engine</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area - Refined */}
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
              aria-live="polite"
              aria-relevant="additions"
            >
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  key={i} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[85%] space-y-3">
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-cyan text-ink font-semibold rounded-tr-none shadow-[0_4px_15px_rgba(34,211,238,0.2)]" 
                        : "bg-white/[0.05] text-slate-200 border border-white/5 rounded-tl-none"
                    }`}>
                      {msg.content}
                    </div>
                    {msg.actions && (
                      <div className="flex flex-wrap gap-2">
                        {msg.actions.map((action, ai) => (
                          <a 
                            key={ai} 
                            href={action.value} 
                            target="_blank" 
                            className="px-3 py-1.5 rounded-lg bg-cyan/10 border border-cyan/20 text-[10px] font-bold text-cyan hover:bg-cyan/20 transition-all flex items-center gap-2"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {action.label.toUpperCase()}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.05] rounded-2xl rounded-tl-none p-4 flex items-center gap-3 text-slate-400 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan" />
                    Analyzing...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Area - Premium */}
            <div className="p-6 bg-black/20 border-t border-white/10">
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {SUGGESTED.map(q => (
                    <button 
                      key={q} 
                      onClick={() => sendMessage(q)}
                      className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan/50 hover:bg-cyan/10 transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Inquire about milestones..."
                  className="w-full pl-5 pr-14 py-4 bg-white/[0.05] border border-white/10 rounded-[1.5rem] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-cyan text-ink rounded-xl shadow-lg disabled:opacity-30 transition-all hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
