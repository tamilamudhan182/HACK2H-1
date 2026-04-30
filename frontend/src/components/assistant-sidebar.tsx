"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, CornerDownLeft, LoaderCircle, Sparkles } from "lucide-react";
import { askAssistant } from "@/lib/api";
import type { AssistantReply, Milestone, UserProfile } from "@/lib/types";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  actions?: AssistantReply["actions"];
};

type AssistantSidebarProps = {
  profile: UserProfile;
  selectedStage?: Milestone;
  onHighlightStage: (stageId: string) => void;
};

const starterPrompts = [
  "When is registration support most important for first-time voters?",
  "What ID do I need to vote?",
  "Where should I check my polling booth details?"
];

export default function AssistantSidebar({
  profile,
  selectedStage,
  onHighlightStage
}: AssistantSidebarProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: `I’m tuned for ${profile.state}. Ask about deadlines, ID requirements, booth lookup, or what comes next in the election cycle.`
      }
    ]);
  }, [profile.state]);

  const headerLabel = useMemo(() => {
    return selectedStage
      ? `Context locked to ${selectedStage.title}`
      : `Context set to ${profile.state}`;
  }, [profile.state, selectedStage]);

  async function submitQuery(query: string) {
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text: trimmed }
    ]);
    setInput("");
    setIsLoading(true);

    try {
      const reply = await askAssistant({
        query: trimmed,
        selectedStage: selectedStage?.id,
        profile
      });

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: reply.answer,
          actions: reply.actions
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitQuery(input);
  }

  return (
    <aside className="sticky top-6 rounded-[1.8rem] border border-white/10 bg-white/8 p-5 shadow-panel backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
            AI assistant
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Election concierge
          </h2>
        </div>
        <div className="rounded-2xl bg-cyan/12 p-3 text-cyan">
          <Bot className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-slate-300">
        {headerLabel}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => submitQuery(prompt)}
            className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-left text-xs text-slate-200 transition hover:border-cyan"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[1.3rem] border px-4 py-3 ${
                message.role === "assistant"
                  ? "border-white/10 bg-slate-950/45"
                  : "border-cyan/20 bg-cyan/10"
              }`}
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                {message.role === "assistant" ? (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    Assistant
                  </>
                ) : (
                  "You"
                )}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                {message.text}
              </p>
              {message.actions?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.actions.map((action) => (
                    <button
                      key={`${message.id}-${action.label}`}
                      type="button"
                      onClick={() => {
                        if (action.type === "open-url") {
                          window.open(action.value, "_blank", "noopener,noreferrer");
                          return;
                        }

                        onHighlightStage(action.value);
                      }}
                      className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs text-white transition hover:border-gold/60"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="assistant-input" className="sr-only">
          Ask the election assistant
        </label>
        <div className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-slate-950/45 px-4 py-3">
          <input
            id="assistant-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about deadlines, IDs, booth locations..."
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-950 transition disabled:opacity-60"
          >
            {isLoading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <CornerDownLeft className="h-4 w-4" />
            )}
            Ask
          </button>
        </div>
      </form>
    </aside>
  );
}

