"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Milestone } from "@/lib/types";

const iconMap: Record<string, string> = {
  registration: "📝",
  nomination: "📋",
  campaign: "📢",
  voting: "🗳️",
  counting: "🔢",
  "government-formation": "🏛️",
};

interface TimelineClientProps {
  milestones: Milestone[];
}

export function TimelineClient({ milestones }: TimelineClientProps) {
  return (
    <div className="relative py-10">
      {/* Vertical Line Gradient */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan/30 to-transparent transform md:-translate-x-1/2" />

      <div className="space-y-24">
        {milestones.map((step, idx) => {
          const isEven = idx % 2 === 0;
          const emoji = step.icon || iconMap[step.id] || "📌";

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center ${
                isEven ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Node - Enhanced Glow */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10 w-12 h-12 rounded-2xl bg-[#030816] border border-cyan/50 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                <div className="w-3 h-3 rounded-full bg-cyan cyan-glow animate-pulse" />
              </div>

              {/* Content Card - Premium Glass */}
              <div className={`w-full pl-16 md:pl-0 md:w-[45%] ${
                isEven ? "md:pr-20 text-left md:text-right" : "md:pl-20 text-left"
              }`}>
                <Link href={`/timeline/${step.id}`} className="block group">
                  <div className="premium-glass p-8 rounded-[2.5rem] hover:border-cyan/40 transition-all cursor-pointer relative overflow-hidden group-hover:-translate-y-2">
                    {/* Background Icon Watermark */}
                    <div className={`absolute -top-6 ${isEven ? "-right-6" : "-left-6"} text-9xl opacity-[0.03] group-hover:opacity-10 transition-opacity select-none pointer-events-none grayscale`}>
                      {emoji}
                    </div>

                    <div className={`flex items-center gap-4 mb-4 ${isEven ? "md:justify-end" : "justify-start"}`}>
                      <span className="text-2xl">{emoji}</span>
                      <span className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-[10px] font-bold tracking-widest text-cyan uppercase">
                        {step.windowLabel}
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-6 text-sm font-light">
                      {step.shortDescription}
                    </p>

                    <div className={`flex items-center gap-2 text-xs font-bold text-cyan group-hover:gap-4 transition-all ${isEven ? "md:justify-end" : "justify-start"}`}>
                      <span className="uppercase tracking-widest">Explore Details</span>
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        &rarr;
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
