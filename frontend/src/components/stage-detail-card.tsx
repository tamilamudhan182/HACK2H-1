"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarPlus,
  CheckSquare,
  MapPinned,
  Volume2,
  VolumeX
} from "lucide-react";
import { getCalendarLink, getMapsLink } from "@/lib/api";
import type { Milestone } from "@/lib/types";

type StageDetailCardProps = {
  milestone?: Milestone;
  onTaskAction: (title: string) => Promise<void>;
};

export function StageDetailCard({
  milestone,
  onTaskAction
}: StageDetailCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  async function openCalendar() {
    if (!milestone) {
      return;
    }

    const result = await getCalendarLink(milestone.id);
    window.open(result.url, "_blank", "noopener,noreferrer");
  }

  async function openMaps() {
    if (!milestone) {
      return;
    }

    const result = await getMapsLink(milestone.boothQuery);
    window.open(result.url, "_blank", "noopener,noreferrer");
  }

  function toggleNarration() {
    if (!milestone || !("speechSynthesis" in window)) {
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      `${milestone.title}. ${milestone.longDescription}`
    );
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }

  return (
    <AnimatePresence mode="wait">
      {milestone ? (
        <motion.section
          key={milestone.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="rounded-[1.8rem] border border-white/10 bg-white/6 p-6 shadow-panel backdrop-blur-lg"
          aria-live="polite"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                {milestone.windowLabel}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {milestone.icon} {milestone.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                {milestone.longDescription}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleNarration}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-slate-200"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="h-4 w-4" />
                  Stop narration
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" />
                  Narrate step
                </>
              )}
            </button>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Key steps
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                {milestone.learnMore.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/5 bg-white/4 px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  What to prepare
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {milestone.eligibility.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-coral" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/35 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Quick actions
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={openCalendar}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02]"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Calendar
                  </button>
                  <button
                    type="button"
                    onClick={openMaps}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white transition hover:border-cyan"
                  >
                    <MapPinned className="h-4 w-4" />
                    Booth map
                  </button>
                  <button
                    type="button"
                    onClick={() => onTaskAction(milestone.title)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gold/40 bg-gold/12 px-4 py-3 text-sm text-gold transition hover:border-gold"
                  >
                    <CheckSquare className="h-4 w-4" />
                    Google Tasks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}

