"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Loader2, ExternalLink } from "lucide-react";
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
    { role: "assistant", content: "Hi! I'm your Election Assistant 🗳️ Ask me anything about the election process, deadlines, or voter documents." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Listen for custom event from other pages (e.g. FAQ page's "Open Assistant" button)
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-assistant", handler);
    return () => window.removeEventListener("open-assistant", handler);
  }, []);

  // Auto-scroll to latest message
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
      const reply = await askAssistant({
        query: text,
        profile: defaultProfile,
      });
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: reply.answer,
          actions: reply.actions,
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please check the FAQs or Timeline for information.",
        }
      ]);
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
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 bg-cyan text-ink rounded-full shadow-[0_0_20px_rgba(89,213,224,0.4)] hover:shadow-[0_0_30px_rgba(89,213,224,0.6)] transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        initial={false}
        animate={isOpen ? { scale: 0, opacity: 0, pointerEvents: "none" } : { scale: 1, opacity: 1 }}
        aria-label="Open election assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[560px] flex flex-col bg-ink/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-panel"
            role="dialog"
            aria-label="Election Assistant Chat"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-cyan/20 rounded-lg">
                  <Sparkles className="w-4 h-4 text-cyan" />
                </div>
                <div>
                  <span className="font-semibold text-mist block text-sm">Election Assistant</span>
                  <span className="text-xs text-cyan/70">Powered by context engine</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-mist/50 hover:text-mist transition-colors"
                aria-label="Close assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`p-3 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-cyan text-ink rounded-tr-sm"
                          : "bg-white/10 text-mist rounded-tl-sm border border-white/5"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {/* Action buttons from the assistant response */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-col gap-1">
                        {msg.actions.filter(a => a.type === "open-url").map((action, ai) => (
                          <a
                            key={ai}
                            href={action.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs text-cyan hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-cyan/10 border border-cyan/20 hover:bg-cyan/20"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {action.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm border border-white/5 p-3 flex items-center gap-2 text-mist/60 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggested Queries */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                {SUGGESTED.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-mist/70 hover:bg-cyan/10 hover:border-cyan/30 hover:text-white transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-black/20 shrink-0">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about deadlines, booths, documents..."
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-mist placeholder:text-mist/40 focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
                  aria-label="Chat input"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan disabled:text-mist/20 transition-colors"
                  aria-label="Send message"
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
