"use client";

import { motion } from "framer-motion";
import { Compass, ShieldCheck, Sparkles } from "lucide-react";
import type { UserProfile } from "@/lib/types";

type HeroPanelProps = {
  profile: UserProfile;
  onProfileChange: (next: UserProfile) => void;
};

const states = ["Tamil Nadu", "Karnataka", "Maharashtra", "Delhi", "Kerala"];

export function HeroPanel({ profile, onProfileChange }: HeroPanelProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-8 shadow-panel backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,111,97,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(89,213,224,0.18),_transparent_32%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-slate-200"
          >
            <Sparkles className="h-4 w-4 text-gold" />
            Election guidance that feels human, timely, and useful
          </motion.div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              A premium civic assistant for every stage of the election journey.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Explore deadlines, understand the process, get personalized next
              steps, and jump into Google Calendar, Maps, and Tasks without
              friction.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Compass,
                title: "Guided timelines",
                copy: "Follow the entire election cycle from registration to government formation."
              },
              {
                icon: ShieldCheck,
                title: "Practical preparedness",
                copy: "Know what ID to bring, where to go, and what to do next."
              },
              {
                icon: Sparkles,
                title: "Smart assistance",
                copy: "Ask natural questions and get answers shaped by your state and stage."
              }
            ].map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-slate-950/30 p-4"
              >
                <Icon className="mb-3 h-5 w-5 text-cyan" />
                <h2 className="text-sm font-semibold text-white">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-white/12 bg-slate-950/45 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Personalized context
          </p>
          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm text-slate-300">State</span>
              <select
                aria-label="Select state"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none ring-0 transition focus:border-cyan"
                value={profile.state}
                onChange={(event) =>
                  onProfileChange({ ...profile, state: event.target.value })
                }
              >
                {states.map((state) => (
                  <option key={state} value={state} className="bg-slate-900">
                    {state}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-slate-300">District / city</span>
              <input
                aria-label="District"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan focus:outline-none"
                value={profile.district}
                onChange={(event) =>
                  onProfileChange({ ...profile, district: event.target.value })
                }
                placeholder="Chennai"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className={`rounded-2xl border px-4 py-3 text-left transition ${
                  profile.firstTimeVoter
                    ? "border-cyan bg-cyan/15 text-white"
                    : "border-white/10 bg-white/6 text-slate-300"
                }`}
                onClick={() =>
                  onProfileChange({
                    ...profile,
                    firstTimeVoter: !profile.firstTimeVoter
                  })
                }
              >
                <span className="block text-sm font-medium">First-time voter</span>
                <span className="mt-1 block text-xs text-slate-400">
                  Guidance adds registration and ID reminders.
                </span>
              </button>

              <button
                type="button"
                className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left text-slate-300 transition hover:border-gold/60"
                onClick={() =>
                  onProfileChange({
                    ...profile,
                    languagePreference:
                      profile.languagePreference === "simple"
                        ? "detailed"
                        : "simple"
                  })
                }
              >
                <span className="block text-sm font-medium">View style</span>
                <span className="mt-1 block text-xs text-slate-400">
                  {profile.languagePreference === "simple"
                    ? "Simple language is active."
                    : "Detailed guidance is active."}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

