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
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2" />

      <div className="space-y-12">
        {milestones.map((step, idx) => {
          const isEven = idx % 2 === 0;
          const emoji = step.icon || iconMap[step.id] || "📌";

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center ${
                isEven ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Node */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-10 w-8 h-8 rounded-full bg-ink border-2 border-cyan flex items-center justify-center shadow-[0_0_15px_rgba(89,213,224,0.4)]">
                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              </div>

              {/* Content Card */}
              <div className={`w-full pl-12 md:pl-0 md:w-[45%] ${
                isEven ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"
              }`}>
                <Link href={`/timeline/${step.id}`} className="block group">
                  <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-cyan/50 transition-all cursor-pointer relative overflow-hidden group-hover:shadow-[0_0_30px_rgba(89,213,224,0.15)]">
                    <div className={`absolute top-3 ${isEven ? "right-3 md:right-4" : "right-3"} text-6xl opacity-10 group-hover:opacity-20 transition-opacity select-none`}>
                      {emoji}
                    </div>

                    <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:justify-end" : "justify-start"}`}>
                      <span className="text-lg">{emoji}</span>
                      <span className="text-xs font-semibold tracking-wider text-cyan uppercase">{step.windowLabel}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-mist/60 leading-relaxed mb-4">{step.shortDescription}</p>

                    <span className="inline-flex items-center text-sm text-cyan font-medium group-hover:underline decoration-cyan/50 underline-offset-4 transition-all">
                      View Details &rarr;
                    </span>
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
