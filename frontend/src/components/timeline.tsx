"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import type { Milestone } from "@/lib/types";

type TimelineProps = {
  milestones: Milestone[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export function Timeline({ milestones, selectedId, onSelect }: TimelineProps) {
  return (
    <section className="space-y-4" aria-labelledby="timeline-heading">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
            Interactive timeline
          </p>
          <h2
            id="timeline-heading"
            className="mt-2 text-2xl font-semibold text-white"
          >
            Move through the election process step by step
          </h2>
        </div>
        <p className="hidden text-sm text-slate-400 md:block">
          Scroll horizontally, then tap any milestone to expand the guidance.
        </p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max items-stretch gap-4">
          {milestones.map((milestone, index) => {
            const active = selectedId === milestone.id;
            return (
              <motion.button
                key={milestone.id}
                type="button"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(milestone.id)}
                className={clsx(
                  "relative min-h-[240px] min-w-[260px] rounded-[1.8rem] border p-5 text-left shadow-panel transition",
                  active
                    ? "border-cyan bg-white/12"
                    : "border-white/10 bg-white/6 hover:border-white/20"
                )}
                aria-pressed={active}
              >
                <div className="absolute left-6 right-6 top-0 hidden h-px bg-gradient-to-r from-transparent via-white/30 to-transparent lg:block" />
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-2xl">
                  {milestone.icon}
                </span>
                <div className="mt-5 space-y-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Stage {index + 1}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-sm leading-6 text-slate-300">
                    {milestone.shortDescription}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
                  <span>{milestone.windowLabel}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">
                    Learn more
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

